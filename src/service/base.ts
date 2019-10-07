import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

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
    Authorization: 'xxx',
  } : undefined;
  const params = isGet ? data : undefined;
  const bodyData = isGet ? undefined : data;
  let response;
  try {
    response = await axios({
      url: `${BASE_URL}${url}`,
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
  return response.data as BaseResponse<T>;
}
