import axios, { AxiosPromise } from 'axios';

const BASE_URL = 'http://localhost:8080';

interface RequestOptions {
  url: string;
  auth?: boolean;
  data?: Record<string, any>;
  method?: 'GET' | 'POST';
}

interface BaseResponse<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

export default function ajax<T = null>(options: RequestOptions): AxiosPromise<BaseResponse<T>> {
  const {
    url,
    method,
    auth,
    data,
  } = options;
  const isGet = method !== 'POST';
  const headers = auth ? {
    'Authorization': 'xxx',
  } : undefined;
  const params = isGet ? data : undefined;
  const bodyData = isGet ? undefined : data;
  return axios({
    url: `${BASE_URL}${url}`,
    method,
    headers,
    params,
    data: bodyData,
  });
}
