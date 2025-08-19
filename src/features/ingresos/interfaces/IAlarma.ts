export interface IAlarma {
  id: number;
  nombre: string;
  estado: string;
  fecha: Date;
  ingresoId: number;
}

export interface ICreateAlarma extends Omit<IAlarma, "id"> {}

export interface IUpdateAlarma extends IAlarma {}
