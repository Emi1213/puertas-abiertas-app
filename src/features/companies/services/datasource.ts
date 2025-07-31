import { AxiosClient } from "../../../core/infraestructure/http/axios-client";
import type { IHttpHandler } from "../../../core/interfaces/IHttpHandler";

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

//   getAll = async (): Promise<> => {

//   }
}
