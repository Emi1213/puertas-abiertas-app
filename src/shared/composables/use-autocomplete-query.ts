import { computed, type MaybeRef, toValue } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useDebounced } from "./use-debounced";

export interface AutocompleteQueryResult<T> {
  items: T[];
  total?: number;
}

export function useAutocompleteQuery<T, D extends Record<string, any>>(opts: {
  key: string;
  term: MaybeRef<string>;
  deps?: MaybeRef<D>;
  enabled?: MaybeRef<boolean>;
  minChars?: number;
  page?: number;
  pageSize?: number;
  fetcher: (
    args: {
      term: string;
      page: number;
      pageSize: number;
    } & D
  ) => Promise<AutocompleteQueryResult<T>>;
}) {
  const debouncedTerm = useDebounced(
    computed(() => toValue(opts.term)),
    250
  );

  const enabledComputed = computed(() => {
    const okEnabled = toValue(opts.enabled) ?? true;
    const minChars = opts.minChars ?? 0;
    return okEnabled && (debouncedTerm.value?.length ?? 0) >= minChars;
  });

  const queryKey = computed(() => [
    "autocomplete",
    opts.key,
    debouncedTerm.value,
    toValue(opts.deps) ?? {},
    opts.page ?? 1,
    opts.pageSize ?? 10,
  ]);

  const query = useQuery({
    queryKey,
    enabled: enabledComputed,
    queryFn: async () => {
      const term = debouncedTerm.value || "";
      const page = opts.page ?? 1;
      const pageSize = opts.pageSize ?? 10;
      const deps = (toValue(opts.deps) ?? {}) as D;
      return opts.fetcher({ term, page, pageSize, ...deps });
    },
  });

  return {
    ...query,
  };
}
