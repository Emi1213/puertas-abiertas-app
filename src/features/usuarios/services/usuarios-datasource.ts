import type {
  ICreateUsuario,
  IUpdateUsuario,
  IUsuario,
} from "@/features/usuarios/interfaces/IUsuario";
import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import { API_ROUTES } from "@/core/api/routes/api-routes";
import type {
  IUsuarioActiveDirectoryFilters,
  IUsuarioFilters,
} from "../interfaces/IUsuarioFilters";
import type { IRespuestaPaginada } from "@/shared/interfaces/IRespuestaPaginada";
import type { IUsuarioActiveDirectory } from "../interfaces/IUsuarioActiveDirectory";

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

  async create(usuario: ICreateUsuario): Promise<IUsuario> {
    const datos = await this.httpClient.post<IUsuario>(
      API_ROUTES.USUARIOS.CREATE,
      usuario
    );
    return datos.datos;
  }

  async update(usuario: IUpdateUsuario): Promise<IUsuario> {
    const datos = await this.httpClient.put<IUsuario>(
      API_ROUTES.USUARIOS.UPDATE(usuario.id.toString()),
      usuario
    );
    return datos.datos;
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(API_ROUTES.USUARIOS.DELETE(id.toString()));
  }

  async search(query: IUsuarioFilters): Promise<IRespuestaPaginada<IUsuario>> {
    const respuesta = await this.httpClient.get<IRespuestaPaginada<IUsuario>>(
      API_ROUTES.USUARIOS.SEARCH,
      { params: query }
    );
    return respuesta.datos;
  }

  async searchActiveDirectory(
    query: IUsuarioActiveDirectoryFilters
  ): Promise<IUsuarioActiveDirectory[]> {
    const respuesta = await this.httpClient.get<IUsuarioActiveDirectory[]>(
      API_ROUTES.USUARIOS.ACTIVE_DIRECTORY.SEARCH,
      { params: query }
    );
    console.log(respuesta);
    return respuesta.datos;
  }
}
