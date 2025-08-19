import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type { INavegacionModulos } from "../interfaces/INavegacionModulos";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class NavegacionDatasource {
  private httpClient: IHttpHandler;
  private static instance: NavegacionDatasource;
  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }
  static getInstance(): NavegacionDatasource {
    if (!NavegacionDatasource.instance) {
      NavegacionDatasource.instance = new NavegacionDatasource();
    }
    return NavegacionDatasource.instance;
  }

  async getMe(): Promise<INavegacionModulos> {
    const respuesta = await this.httpClient.get<INavegacionModulos>(
      API_ROUTES.NAVEGACION.ME
    );
    return respuesta.datos;
  }
}
