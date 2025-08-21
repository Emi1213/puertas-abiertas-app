import { ref, computed, type Ref } from "vue";
import { usePersonalFilters } from "./queries/use-personal-filters";
import type { IPersonal } from "../interfaces/IPersonal";

export function usePersonalAutocomplete(
  empresaId?: Ref<number | undefined> | number | undefined
) {
  const selectedPersonal = ref<IPersonal | null>(null);
  const isOpen = ref(false);
  const searchTerm = ref("");

  const shouldSearch = computed(() => isOpen.value);
  const empresaIdRef = computed(() => {
    if (typeof empresaId === "object" && empresaId && "value" in empresaId) {
      return empresaId.value;
    }
    return empresaId as number | undefined;
  });

  const {
    data: personal,
    isLoading,
    error,
  } = usePersonalFilters(
    computed(() => ({
      busqueda: searchTerm.value || undefined,
      estado: true, 
      empresaId: empresaIdRef.value,
      pagina: 1,
      tamanioPagina: 10,
    }))
  );

  const displayedPersonal = computed(() => {
    if (!shouldSearch.value) return [];
    return personal.value?.items || [];
  });

  const selectPersonal = (person: IPersonal) => {
    selectedPersonal.value = person;
    searchTerm.value = `${person.nombres} ${person.apellidos}`;
    isOpen.value = false;
  };

  const clearSelection = () => {
    selectedPersonal.value = null;
    searchTerm.value = "";
  };

  const openDropdown = () => {
    isOpen.value = true;
  };

  const closeDropdown = () => {
    isOpen.value = false;
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      isOpen.value = false;
      if (!selectedPersonal.value && searchTerm.value) {
        searchTerm.value = "";
      }
    }, 200);
  };

  const setInitialPersonal = (person: IPersonal | null) => {
    selectedPersonal.value = person;
    searchTerm.value = person ? `${person.nombres} ${person.apellidos}` : "";
  };

  return {
    selectedPersonal,
    searchTerm,
    isOpen,
    isLoading,
    error,
    displayedPersonal,
    shouldSearch,
    selectPersonal,
    clearSelection,
    openDropdown,
    closeDropdown,
    handleInputBlur,
    setInitialPersonal,
  };
}
