import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type { IPerfil } from "../interfaces/IPerfil";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class PerfilesDataSource {
  private httpClient: IHttpHandler;
  private static instance: PerfilesDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): PerfilesDataSource {
    if (!PerfilesDataSource.instance) {
      PerfilesDataSource.instance = new PerfilesDataSource();
    }
    return PerfilesDataSource.instance;
  }

  async getAll(): Promise<IPerfil[]> {
    const respuesta = await this.httpClient.get<IPerfil[]>(
      API_ROUTES.PERFILES.GETALL
    );
    return respuesta.datos;
  }
}
