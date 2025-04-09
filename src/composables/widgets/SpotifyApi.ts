import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

export class SpotifyApi {
  private static readonly BASEURL = 'https://api.spotify.com/v1';

  private static async getSpotifyStore() {
    return import('@/stores/widgets/spotify').then(({ useSpotifyStore }) => useSpotifyStore());
  }

  public static async get<T = any>(route: string, params = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', route, params, headers);
  }

  public static async post<T = any>(route: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', route, data, headers);
  }

  public static async put<T = any>(route: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', route, data, headers);
  }

  public static async patch<T = any>(route: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.request<T>('PATCH', route, data, headers);
  }

  public static async delete<T = any>(route: string, params = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', route, params, headers);
  }

  private static async request<T = any>(
    method: string,
    endpoint: string,
    data: any = {},
    customHeaders: object = {}
  ): Promise<AxiosResponse<T>> {
    const store = await this.getSpotifyStore();
    const token = await store.getAccessToken();
    
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      baseURL: this.BASEURL,
      headers: {
        Authorization: `Bearer ${token}`,
        ...customHeaders
      }
    };
    
    if (method === 'GET' || method === 'DELETE') {
      config.params = data;
    } else {
      config.data = data;
    }
    
    return axios.request<T>(config);
  }
}