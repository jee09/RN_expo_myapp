import axios, { AxiosResponse, AxiosError } from 'axios';
import { SERVER_BASE_URL, KAKAO_BASE_URL, KAKAO_API_KEY } from '@env';

const serverApi = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
});

serverApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.log('Server API request failed: ', error);
    return Promise.reject(error);
  },
);

const kakaoApi = axios.create({
  baseURL: KAKAO_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: KAKAO_API_KEY,
  },
});

kakaoApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('Kakao API request failed: ', error);
    return Promise.reject(error);
  },
);

export { serverApi, kakaoApi };
