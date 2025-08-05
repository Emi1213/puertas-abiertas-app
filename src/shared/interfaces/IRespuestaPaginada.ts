export interface IRespuestaPaginada<T> {
  items: T[];
  totalItems: number;
  totalPaginas: number;
  pagina: number;
  tamanioPagina: number;
}
