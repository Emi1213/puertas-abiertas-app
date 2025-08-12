import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type { IIngreso } from "../interfaces/IIngreso";
import { API_ROUTES } from "@/core/api/routes/api-routes";
import type { IIngresoFilters } from "../interfaces/IIngresoFilters";
import type { IRespuestaPaginada } from "@/shared/interfaces/IRespuestaPaginada";

export class IngresosDataSource {
  private httpClient: IHttpHandler;
  private static instance: IngresosDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): IngresosDataSource {
    if (!IngresosDataSource.instance) {
      IngresosDataSource.instance = new IngresosDataSource();
    }
    return IngresosDataSource.instance;
  }

  async getAll(): Promise<IIngreso[]> {
    const respuesta = await this.httpClient.get<IIngreso[]>(
      API_ROUTES.INGRESOS.GETALL
    );
    return respuesta.datos;
  }

  async search(query: IIngresoFilters): Promise<IRespuestaPaginada<IIngreso>> {
    const respuesta = await this.httpClient.get<IRespuestaPaginada<IIngreso>>(
      API_ROUTES.INGRESOS.SEARCH,
      { params: query }
    );
    return respuesta.datos;
  }

  async recognize(id: number): Promise<void> {
    await this.httpClient.patch(
      API_ROUTES.INGRESOS.RECOGNIZE(id.toString()),
      {}
    );
  }
}
