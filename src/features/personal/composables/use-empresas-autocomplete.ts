import { ref, computed } from "vue";
import { useEmpresasFilters } from "@/features/empresas/composables/queries/use-empresas-filters";
import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";

export function useEmpresasAutocomplete() {
  const selectedEmpresa = ref<IEmpresa | null>(null);
  const isOpen = ref(false);
  const searchTerm = ref("");

  const shouldSearch = computed(() => isOpen.value);

  const {
    data: empresas,
    isLoading,
    error,
  } = useEmpresasFilters(
    computed(() => ({
      busqueda: searchTerm.value || undefined,
      estado: true, // Solo empresas activas
      pagina: 1,
      tamanioPagina: 10,
    }))
  );

  const displayedEmpresas = computed(() => {
    if (!shouldSearch.value) return [];
    return empresas.value?.items || [];
  });

  const selectEmpresa = (empresa: IEmpresa) => {
    selectedEmpresa.value = empresa;
    searchTerm.value = empresa.nombre;
    isOpen.value = false;
  };

  const clearSelection = () => {
    selectedEmpresa.value = null;
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
      if (!selectedEmpresa.value && searchTerm.value) {
        searchTerm.value = "";
      }
    }, 200);
  };

  const setInitialEmpresa = (empresa: IEmpresa | null) => {
    selectedEmpresa.value = empresa;
    searchTerm.value = empresa?.nombre || "";
  };

  return {
    // State
    selectedEmpresa,
    searchTerm,
    isOpen,
    isLoading,
    error,
    displayedEmpresas,
    shouldSearch,
    selectEmpresa,
    clearSelection,
    openDropdown,
    closeDropdown,
    handleInputBlur,
    setInitialEmpresa,
  };
}
