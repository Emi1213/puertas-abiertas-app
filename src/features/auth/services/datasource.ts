import { API_ROUTES } from "../../../core/api/routes/api-routes";
import { AxiosClient } from "../../../core/infraestructure/http/axios-client";
import type {
  IHttpHandler,
  IHttpResponse,
} from "../../../core/interfaces/IHttpHandler";
import { useAuthStore } from "../context/auth-store";
import type { ILogin, ILoginResponse } from "../interfaces/auth.interfaces";

export class AuthDataSource {
  private httpClient: IHttpHandler;
  private static instance: AuthDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): AuthDataSource {
    if (!this.instance) {
      this.instance = new AuthDataSource();
    }
    return this.instance;
  }

  async login({ usuario, contrasenia }: ILogin) {
    try {
      const data = await this.httpClient.post<IHttpResponse<ILoginResponse>>(
        API_ROUTES.AUTH.LOGIN,
        {
          usuario,
          contrasenia,
        }
      );

      console.log("Login response:");

      if (!data || !data.Datos) {
        throw new Error("Credenciales inválidas o token no recibido.");
      }

      useAuthStore().setToken(data.Datos.token);
      this.httpClient.setAccessToken(data.Datos.token);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Credenciales incorrectas.";
      throw new Error(message);
    }
  }

  logout() {
    useAuthStore().logout();
    this.httpClient.setAccessToken(null);
  }
}
