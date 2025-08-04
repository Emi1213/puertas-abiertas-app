export interface ICompany {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface ICreateCompany extends Omit<ICompany, "id"> {}
export interface IUpdateCompany extends Partial<ICreateCompany> {}
