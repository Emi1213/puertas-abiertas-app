import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type {
  IEmpresa,
  ICreateEmpresa,
  IUpdateEmpresa,
} from "../interfaces/IEmpresa";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class CompanyDataSource {
  private httpClient: IHttpHandler;
  private static instance: CompanyDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): CompanyDataSource {
    if (!CompanyDataSource.instance) {
      CompanyDataSource.instance = new CompanyDataSource();
    }
    return CompanyDataSource.instance;
  }

  async getAll(): Promise<IEmpresa[]> {
    const response = await this.httpClient.get<IEmpresa[]>(
      API_ROUTES.EMPRESAS.GETALL
    );
    return response.datos;
  }

  async create(company: ICreateEmpresa): Promise<IEmpresa> {
    const data = await this.httpClient.post<IEmpresa>(
      API_ROUTES.EMPRESAS.CREATE,
      company
    );
    return data.datos;
  }

  async update(company: IUpdateEmpresa): Promise<IEmpresa> {
    const data = await this.httpClient.put<IEmpresa>(
      API_ROUTES.EMPRESAS.UPDATE(company.id.toString()),
      company
    );
    return data.datos;
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(API_ROUTES.EMPRESAS.DELETE(id.toString()));
  }
}
