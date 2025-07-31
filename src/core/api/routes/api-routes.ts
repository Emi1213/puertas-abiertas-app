const AR_KEYS = {
  AUTH: "/auth",
  COMPANIES: "/empresas",
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
};
