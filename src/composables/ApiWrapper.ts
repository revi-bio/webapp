import axios from 'axios';

export interface ApiResponse<T> {
  data: T;
  type: 'success' | 'error';
  status: number;
}

export class ApiWrapper {
  private static readonly BACKEND_URL = 'http://65.87.7.245';

  // A store-t itt hozzuk létre, amikor szükség van rá
  private static getUserStore() {
    return import('@/stores/user').then(({ useUserStore }) => useUserStore());
  }

  public static async get<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('GET', route, data, headers, store);
  }

  public static async post<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('POST', route, data, headers, store);
  }

  public static async patch<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('PATCH', route, data, headers, store);
  }

  public static async put<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('PUT', route, data, headers, store);
  }

  public static async delete<T = any>(route: string, data: any, headers = {}): Promise<ApiResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('DELETE', route, data, headers, store);
  }

  private static async request<T = any>(
    method: string,
    route: string,
    data: any,
    extraHeaders: object,
    store: any,
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
