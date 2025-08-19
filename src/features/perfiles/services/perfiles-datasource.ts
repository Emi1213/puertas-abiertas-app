import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type {
  ICreatePerfil,
  IPerfil,
  IUpdatePerfil,
} from "../interfaces/IPerfil";
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
  async create(perfil: ICreatePerfil): Promise<IPerfil> {
    const datos = await this.httpClient.post<IPerfil>(
      API_ROUTES.PERFILES.CREATE,
      perfil
    );
    return datos.datos;
  }

  async update(perfil: IUpdatePerfil): Promise<IPerfil> {
    const datos = await this.httpClient.put<IPerfil>(
      API_ROUTES.PERFILES.UPDATE(perfil.id.toString()),
      perfil
    );
    return datos.datos;
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete<void>(
      API_ROUTES.PERFILES.DELETE(id.toString())
    );
  }
}
