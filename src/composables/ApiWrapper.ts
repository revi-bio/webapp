import { useUserStore } from '@/stores/user';
import axios, { AxiosHeaders } from 'axios';

export interface ApiResponse<T> {
  data: T;
  type: 'success' | 'error';
  status: number;
}

export class ApiWrapper {
  private static readonly BACKEND_URL = 'http://127.0.0.1:3000/';
  // private static readonly userStore = useUserStore();

  public static async get<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    return await this.request<T>('GET', route, data, headers);
  }

  public static async post<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    return await this.request<T>('POST', route, data, headers);
  }

  public static async patch<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    return await this.request<T>('PATCH', route, data, headers);
  }

  public static async put<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    return await this.request<T>('PUT', route, data, headers);
  }

  public static async delete<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    return await this.request<T>('DELETE', route, data, headers);
  }

  private static async request<T = any>(
    method: string,
    route: string,
    data: any,
    extraHeaders: object,
    store: any = useUserStore(),
  ): Promise<ApiResponse<T>> {
    const res = await axios.request({
      method,
      url: route,
      baseURL: ApiWrapper.BACKEND_URL,
      data,
      headers: store.loggedIn()
        ? {
            Authorization: `Bearer ${store.getJwt()}`,
            ...extraHeaders
          }
        : extraHeaders
    });

    const resData: ApiResponse<T> = res.data;
    return resData;
  }
}