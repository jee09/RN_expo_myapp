import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import { API_URL } from '@env';

interface ICustomConfig extends AxiosRequestConfig {
  useCustomErrorHandle?: boolean;
}

interface ICreateApiParams {
  baseUrl: string;
  customErrorHandler?: (error: AxiosError) => Promise<AxiosError>;
}

export const createApi = ({
  baseUrl,
  customErrorHandler,
}: ICreateApiParams): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: baseUrl,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const config = error.config as ICustomConfig;
      if (config?.useCustomErrorHandle === true || !customErrorHandler) {
        return Promise.reject(error);
      }
      return customErrorHandler(error);
    },
  );

  return api;
};
