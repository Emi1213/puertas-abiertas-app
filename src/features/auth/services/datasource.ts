import { API_ROUTES } from "../../../core/api/routes/api-routes";
import { AxiosClient } from "../../../core/infraestructure/http/axios-client";
import type { IHttpHandler } from "../../../core/interfaces/IHttpHandler";
import { useAuthStore } from "../context/auth-store";
import type { IAccount } from "../interfaces/IAccount";
import type { ILogin, ILoginResponse } from "../interfaces/ILogin";
import { jwtDecode } from "jwt-decode";

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
      const data = await this.httpClient.post<ILoginResponse>(
        API_ROUTES.AUTH.LOGIN,
        {
          usuario,
          contrasenia,
        }
      );

      if (!data || !data.datos) {
        throw new Error("Credenciales inválidas o token no recibido.");
      }

      const decoded = jwtDecode<Record<string, any>>(data.datos.token);
      const user: IAccount = {
        id: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        username:
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };

      useAuthStore().setToken(data.datos.token);
      useAuthStore().setUser(user);
      this.httpClient.setAccessToken(data.datos.token);
      return user as IAccount;
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
