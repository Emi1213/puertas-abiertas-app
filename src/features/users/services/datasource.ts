import type { IUser } from "@/features/users/interfaces/IUser";
import { AxiosClient } from "@/core/infraestructure/http/axios-client";
import type { IHttpHandler } from "@/core/interfaces/IHttpHandler";
import { API_ROUTES } from "@/core/api/routes/api-routes";

export class UserDataSource {
  private httpClient: IHttpHandler;
  private static instance: UserDataSource;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): UserDataSource {
    if (!UserDataSource.instance) {
      UserDataSource.instance = new UserDataSource();
    }
    return UserDataSource.instance;
  }

  async getAll(): Promise<IUser[]> {
    const response = await this.httpClient.get<IUser[]>(
      API_ROUTES.USERS.GETALL
    );
    console.log("getAll response:", response.datos);
    return response.datos;
  }
}
