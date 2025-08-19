import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type { IModulo } from "../interfaces/IModulo";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class ModuloDatasource {
  private httpClient: IHttpHandler;
  private static instance: ModuloDatasource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }
  static getInstance(): ModuloDatasource {
    if (!ModuloDatasource.instance) {
      ModuloDatasource.instance = new ModuloDatasource();
    }
    return ModuloDatasource.instance;
  }

  async getAll(): Promise<IModulo[]> {
    const respuesta = await this.httpClient.get<IModulo[]>(
      API_ROUTES.MODULOS.GETALL
    );
    return respuesta.datos;
  }

  async getById(id: number): Promise<IModulo> {
    const respuesta = await this.httpClient.get<IModulo>(
      API_ROUTES.MODULOS.GETBYID(id.toString())
    );
    return respuesta.datos;
  }
}
