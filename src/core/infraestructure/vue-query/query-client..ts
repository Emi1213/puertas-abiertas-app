import { QueryClient } from "@tanstack/vue-query";

export const vueQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
    },
  },
});
