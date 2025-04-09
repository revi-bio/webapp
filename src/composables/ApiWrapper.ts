import axios, { type AxiosResponse } from 'axios';

export class ApiWrapper {
  // A store-t itt hozzuk létre, amikor szükség van rá
  private static getUserStore() {
    return import('@/stores/user').then(({ useUserStore }) => useUserStore());
  }

  public static async get<T = any>(route: string, data: any, headers = {}): Promise<AxiosResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('GET', route, data, headers, store);
  }

  public static async post<T = any>(route: string, data: any, headers = {}): Promise<AxiosResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('POST', route, data, headers, store);
  }

  public static async patch<T = any>(route: string, data: any, headers = {}): Promise<AxiosResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('PATCH', route, data, headers, store);
  }

  public static async put<T = any>(route: string, data: any, headers = {}): Promise<AxiosResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('PUT', route, data, headers, store);
  }

  public static async delete<T = any>(route: string, data: any, headers = {}): Promise<AxiosResponse<T>> {
    const store = await this.getUserStore();
    return await this.request<T>('DELETE', route, data, headers, store);
  }

  private static async request<T = any>(
    method: string,
    route: string,
    data: any,
    extraHeaders: object,
    store: any,
  ): Promise<AxiosResponse<T>> {
    const res = await axios.request({
      method,
      url: route,
      baseURL: import.meta.env.VITE_API_BASE_URL,
      data,
      headers: store.loggedIn()
        ? {
            Authorization: `Bearer ${store.getJwt()}`,
            ...extraHeaders
          }
        : extraHeaders
    });

    return res;
  }
}
