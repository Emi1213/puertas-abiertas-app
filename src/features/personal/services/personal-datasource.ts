import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import type {
  IPersonal,
  ICreatePersonal,
  IUpdatePersonal,
} from "../interfaces/IPersonal";
import { API_ROUTES } from "@/core/api/routes/api-routes";
import type { IPersonalFilters } from "../interfaces/IPersonalFilters";
import type { IRespuestaPaginada } from "@/shared/interfaces/IRespuestaPaginada";

export class PersonalDataSource {
  private httpClient: IHttpHandler;
  private static instance: PersonalDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }
  static getInstance(): PersonalDataSource {
    if (!PersonalDataSource.instance) {
      PersonalDataSource.instance = new PersonalDataSource();
    }
    return PersonalDataSource.instance;
  }

  async getAll(): Promise<IPersonal[]> {
    const respuesta = await this.httpClient.get<IPersonal[]>(
      API_ROUTES.PERSONAL.GETALL
    );
    return respuesta.datos;
  }

  async getById(id: number): Promise<IPersonal> {
    const respuesta = await this.httpClient.get<IPersonal>(
      API_ROUTES.PERSONAL.GETBYID(id.toString())
    );
    return respuesta.datos;
  }

  async search(
    query: IPersonalFilters
  ): Promise<IRespuestaPaginada<IPersonal>> {
    const respuesta = await this.httpClient.get<IRespuestaPaginada<IPersonal>>(
      API_ROUTES.PERSONAL.SEARCH,
      { params: query }
    );
    return respuesta.datos;
  }

  async create(personal: ICreatePersonal): Promise<IPersonal> {
    const datos = await this.httpClient.post<IPersonal>(
      API_ROUTES.PERSONAL.CREATE,
      personal
    );
    return datos.datos;
  }

  async update(personal: IUpdatePersonal): Promise<IPersonal> {
    const datos = await this.httpClient.put<IPersonal>(
      API_ROUTES.PERSONAL.UPDATE(personal.id.toString()),
      personal
    );
    return datos.datos;
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete(API_ROUTES.PERSONAL.DELETE(id.toString()));
  }
}
