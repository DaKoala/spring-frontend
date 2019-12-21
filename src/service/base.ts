import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { getToken } from './cookie';
import toast from '@/utils/toast';

/**
 * Base URL of the back-end
 */
export const BASE_URL = 'http://111.229.110.117:8080';

/**
 * Transform JSON data to form data
 */
function transformData(data?: Record<string, any>) {
  if (!data) {
    return undefined;
  }
  const formData = new FormData();
  for (const key of Object.keys(data)) {
    let value = data[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    formData.set(key, value);
  }
  return formData;
}

interface RequestOptions {
  url: string;
  auth?: boolean;
  data?: Record<string, any>;
  method?: 'GET' | 'POST';
}

/**
 * Generate config for axios
 * @param options Config of the request
 */
function generateAxiosConfig(options: RequestOptions): AxiosRequestConfig {
  const {
    url,
    method,
    auth,
    data,
  } = options;
  const isGet = method !== 'POST';
  const headers = auth ? {
    Authorization: getToken(),
  } : {};
  if (!isGet) {
    Object.assign(headers, {
      'Content-Type': 'multipart/form-data; boundary=--------------------------968651210695093966689015',
    });
  }
  const params = isGet ? data : undefined;
  const bodyData = isGet ? undefined : data;
  return {
    url: `${BASE_URL}${url}`,
    transformRequest: [
      transformData,
    ],
    method,
    headers,
    params,
    data: bodyData,
  };
}

/**
 * General error handling for request
 * @param axiosPromise Promise object of the request
 */
async function handleError<T>(axiosPromise: AxiosPromise): Promise<BaseResponse<T>> {
  let response;
  try {
    response = await axiosPromise;
  } catch (e) {
    toast({
      type: 'alert',
      title: 'Error',
      content: e.message,
    });
    throw e;
  }
  if (response.status !== 200) {
    const errorMsg = `${response.statusText}\nError code: ${response.status}`;
    toast({
      type: 'alert',
      title: 'Error',
      content: errorMsg,
    });
    throw new Error(errorMsg);
  }
  const resData = response.data;
  if (!resData.success || resData.code !== 200) {
    toast({
      type: 'alert',
      title: 'Error',
      content: resData.message,
    });
    throw new Error(resData.message);
  }
  if (typeof resData.data === 'string') {
    try {
      const parsedData = JSON.parse(resData.data);
      resData.data = parsedData;
    } catch (e) {}
  }
  return resData;
}

interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

/**
 * General function to send requests
 * @param options Config of the request
 */
export default async function ajax<T = null>(options: RequestOptions): Promise<BaseResponse<T>> {
  const axiosConfig = generateAxiosConfig(options);
  const axiosPromise = axios(axiosConfig);
  const resData = await handleError<T>(axiosPromise);
  return resData;
}
