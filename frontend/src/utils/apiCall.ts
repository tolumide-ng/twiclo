import axios, { type AxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:4000/api/v1/';
const DEFAULT_USER_ID = 'b6093062-c4c9-11f0-828d-629fd5187aa2';

type Props = Omit<AxiosRequestConfig, 'url'> & { path: string };

export type APIResponse<T> = { statusCode: number; message: string; data: T };

export async function apiCall<T>({
  path,
  params,
  method,
  signal,
  data,
}: Props): Promise<APIResponse<T>> {
  const url = new URL(path, API_URL).toString();

  try {
    const response = await axios({
      url,
      method,
      params,
      data,
      signal,
      headers: { 'x-user-id': DEFAULT_USER_ID },
    });
    return response.data as unknown as APIResponse<T>;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}
