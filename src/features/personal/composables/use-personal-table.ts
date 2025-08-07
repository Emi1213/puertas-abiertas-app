import { usePersonalFilters } from "./queries/use-personal-filters";

export function usePersonalTable() {
  const { data, isLoading, error } = usePersonalFilters();
}
