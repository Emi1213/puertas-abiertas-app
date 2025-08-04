export interface BaseDataRow {
  id: string | number;
}

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => any;
}

export interface DataTableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
}

export interface DataTableProps<T extends BaseDataRow> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (row: T, index: number) => void;
  pagination?: boolean;
  emptyMessage?: string;
}



