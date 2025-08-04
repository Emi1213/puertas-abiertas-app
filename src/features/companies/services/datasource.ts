import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type { ICompany } from "../interfaces/ICompany";
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

  async getAll(): Promise<ICompany[]> {
    const response = await this.httpClient.get<ICompany[]>(
      API_ROUTES.COMPANIES.GETALL
    );
    return response.datos;
  }
}
