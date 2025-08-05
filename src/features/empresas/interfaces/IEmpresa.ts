export interface IEmpresa {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface ICreateEmpresa extends Omit<IEmpresa, "id"> {}
export interface IUpdateEmpresa extends Partial<ICreateEmpresa> {
  id: number;
}
