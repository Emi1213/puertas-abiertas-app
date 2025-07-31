export interface IHttpHandler {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data: any, config?: any): Promise<IHttpResponse<T>>;
  put<T>(url: string, data: any, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  setAccessToken(accessToken: string | null): void;
}

export interface IHttpResponse<T> {
  Exitoso: boolean;
  Mensaje: string;
  Datos: T;
}
