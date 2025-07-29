import { API_ROUTES } from "../../../core/api/routes/api-routes";
import { AxiosClient } from "../../../core/infraestructure/http/axios-client";
import type { IHttpHandler } from "../../../core/interfaces/IHttpHandler";
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

  async login({usuario, contrasenia}: ILogin){
    const data = await this.httpClient.post<ILoginResponse>(
        API_ROUTES.AUTH.LOGIN,
        {
            usuario: usuario,
            contrasenia: contrasenia,
        }, 
    )

    if (!data) return

    useAuthSt
  }
}
