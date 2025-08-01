const AR_KEYS = {
  AUTH: "/auth",
  COMPANIES: "/empresas",
  USERS: "/usuarios",
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: AR_KEYS.AUTH + "/login",
  },
  COMPANIES: {
    GETALL: AR_KEYS.COMPANIES,
    GETBYID: (id: string) => `${AR_KEYS.COMPANIES}/${id}`,
    CREATE: AR_KEYS.COMPANIES,
    UPDATE: (id: string) => `${AR_KEYS.COMPANIES}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.COMPANIES}/${id}`,
  },
  USERS: {
    GETALL: AR_KEYS.USERS,
    GETBYID: (id: string) => `${AR_KEYS.USERS}/${id}`,
    CREATE: AR_KEYS.USERS,
    UPDATE: (id: string) => `${AR_KEYS.USERS}/${id}`,
    DELETE: (id: string) => `${AR_KEYS.USERS}/${id}`,
  },
};
