import { API_ROUTES } from "../../../core/api/routes/api-routes";
import { AxiosClient } from "../../../core/infraestructure/http/axios-client";
import type { IHttpHandler } from "../../../core/interfaces/IHttpHandler";
import { useAuthStore } from "../context/auth-store";
import type { ICuenta } from "../interfaces/ICuenta";
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
      const datos = await this.httpClient.post<ILoginResponse>(
        API_ROUTES.AUTH.LOGIN,
        {
          usuario,
          contrasenia,
        }
      );

      if (!datos || !datos.datos) {
        throw new Error("Credenciales inválidas o token no recibido.");
      }

      const decodificado = jwtDecode<Record<string, any>>(datos.datos.token);
      const user: ICuenta = {
        id: decodificado[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        usuario:
          decodificado["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        rol: decodificado[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };

      useAuthStore().setToken(datos.datos.token);
      useAuthStore().setUser(user);
      this.httpClient.setAccessToken(datos.datos.token);
      return user as ICuenta;
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
