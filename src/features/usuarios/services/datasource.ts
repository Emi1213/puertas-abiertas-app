import type { IUsuario } from "@/features/users/interfaces/IUsuario";
import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class UsuarioDataSource {
  private httpClient: IHttpHandler;
  private static instance: UsuarioDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): UsuarioDataSource {
    if (!UsuarioDataSource.instance) {
      UsuarioDataSource.instance = new UsuarioDataSource();
    }
    return UsuarioDataSource.instance;
  }

  async getAll(): Promise<IUsuario[]> {
    const respuesta = await this.httpClient.get<IUsuario[]>(
      API_ROUTES.USUARIOS.GETALL
    );

    return respuesta.datos;
  }
}
