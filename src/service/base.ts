import axios from 'axios';
import { getToken } from './cookie';

const BASE_URL = 'https://62169e25.ngrok.io';

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

interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

export default async function ajax<T = null>(options: RequestOptions) {
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
  let response;
  try {
    response = await axios({
      url: `${BASE_URL}${url}`,
      transformRequest: [
        transformData,
      ],
      method,
      headers,
      params,
      data: bodyData,
    });
  } catch (e) {
    alert(e.message);
    throw e;
  }
  if (response.status !== 200) {
    const errorMsg = `${response.statusText}\nError code: ${response.status}`;
    alert(errorMsg);
    throw new Error(errorMsg);
  }
  const { data: resData } = response;
  if (!resData.success || resData.code !== 200) {
    alert(resData.message);
    throw new Error(resData.message);
  }
  if (typeof response.data.data === 'string') {
    response.data.data = JSON.parse(response.data.data);
  }
  return response.data as BaseResponse<T>;
}
