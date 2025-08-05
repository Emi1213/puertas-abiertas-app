import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type {
  IEmpresa,
  ICreateEmpresa,
  IUpdateEmpresa,
} from "../interfaces/IEmpresa";
import { API_ROUTES } from "@/core/api/routes/api-routes";
import type { IEmpresaFilters } from "../interfaces/IEmpresaFilters";
import type { IRespuestaPaginada } from "@/shared/interfaces/IRespuestaPaginada";

export class EmpresaDataSource {
  private httpClient: IHttpHandler;
  private static instance: EmpresaDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): EmpresaDataSource {
    if (!EmpresaDataSource.instance) {
      EmpresaDataSource.instance = new EmpresaDataSource();
    }
    return EmpresaDataSource.instance;
  }

  async getAll(): Promise<IEmpresa[]> {
    const respuesta = await this.httpClient.get<IEmpresa[]>(
      API_ROUTES.EMPRESAS.GETALL
    );
    return respuesta.datos;
  }

  async create(empresa: ICreateEmpresa): Promise<IEmpresa> {
    const datos = await this.httpClient.post<IEmpresa>(
      API_ROUTES.EMPRESAS.CREATE,
      empresa
    );
    return datos.datos;
  }

  async update(empresa: IUpdateEmpresa): Promise<IEmpresa> {
    const datos = await this.httpClient.put<IEmpresa>(
      API_ROUTES.EMPRESAS.UPDATE(empresa.id.toString()),
      empresa
    );
    return datos.datos;
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(API_ROUTES.EMPRESAS.DELETE(id.toString()));
  }

  async search(query: IEmpresaFilters): Promise<IRespuestaPaginada<IEmpresa>> {
  const respuesta = await this.httpClient.get<IRespuestaPaginada<IEmpresa>>(
    API_ROUTES.EMPRESAS.SEARCH,
    { params: query }
  );
  return respuesta.datos;
}

}
