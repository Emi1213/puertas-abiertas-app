const AR_KEYS = {
  AUTH: "/auth",
  EMPRESAS: "/empresas",
  USUARIOS: "/usuarios",
  PERFILES: "/perfiles",
  PERSONAL: "/personal",
  INGRESOS: "/ingresos",
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: AR_KEYS.AUTH + "/login",
  },
  EMPRESAS: {
    GETALL: AR_KEYS.EMPRESAS,
    GETBYID: (id: string) => `${AR_KEYS.EMPRESAS}/${id}`,
    CREATE: AR_KEYS.EMPRESAS,
    UPDATE: (id: string) => `${AR_KEYS.EMPRESAS}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.EMPRESAS}/${id}`,
    SEARCH: AR_KEYS.EMPRESAS + "/buscar",
  },
  USUARIOS: {
    GETALL: AR_KEYS.USUARIOS,
    GETBYID: (id: string) => `${AR_KEYS.USUARIOS}/${id}`,
    CREATE: AR_KEYS.USUARIOS,
    UPDATE: (id: string) => `${AR_KEYS.USUARIOS}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.USUARIOS}/${id}`,
    SEARCH: AR_KEYS.USUARIOS + "/buscar",
  },
  PERFILES: {
    GETALL: AR_KEYS.PERFILES,
  },
  PERSONAL: {
    GETALL: AR_KEYS.PERSONAL,
    GETBYID: (id: string) => `${AR_KEYS.PERSONAL}/${id}`,
    CREATE: AR_KEYS.PERSONAL,
    UPDATE: (id: string) => `${AR_KEYS.PERSONAL}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.PERSONAL}/${id}`,
    SEARCH: AR_KEYS.PERSONAL + "/buscar",
  },
  INGRESOS: {
    GETALL: AR_KEYS.INGRESOS,
    GETBYID: (id: string) => `${AR_KEYS.INGRESOS}/${id}`,
    CREATE: AR_KEYS.INGRESOS,
    UPDATE: (id: string) => `${AR_KEYS.INGRESOS}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.INGRESOS}/${id}`,
    SEARCH: AR_KEYS.INGRESOS + "/buscar",
    RECOGNIZE: (id: string) => `${AR_KEYS.INGRESOS}/${id}/reconocer`,
  },
};
