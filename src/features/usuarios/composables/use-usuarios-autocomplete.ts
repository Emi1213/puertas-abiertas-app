import { ref, computed } from "vue";
import type { IUsuarioActiveDirectory } from "../interfaces/IUsuarioActiveDirectory";
import { useUsuariosActiveDirectory } from "./queries/use-active-directory";

export function useUsuariosAdAutocomplete(
) {
  const selectedUsuario = ref<IUsuarioActiveDirectory | null>(null);
  const isOpen = ref(false);
  const searchTerm = ref("");

  const shouldSearch = computed(() => isOpen.value);


  const {
    data: usuarios,
    isLoading,
    error,
  } = useUsuariosActiveDirectory(
    computed(() => ({
      busqueda: searchTerm.value || undefined,
    }))
  );

  const displayedUsuarios = computed(() => {
    if (!shouldSearch.value) return [];
    return usuarios.value || [];
  });

  const selectUsuario = (user: IUsuarioActiveDirectory) => {
    selectedUsuario.value = user;
    searchTerm.value = user.nombreParaMostrar;
    isOpen.value = false;
  };
  const clearSelection = () => {
    selectedUsuario.value = null;
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
      if (!selectedUsuario.value && searchTerm.value) {
        searchTerm.value = "";
      }
    }, 200);
  };

  const setInitialUsuario = (user: IUsuarioActiveDirectory) => {
    selectedUsuario.value = user;
    searchTerm.value = user.nombreParaMostrar;
    isOpen.value = false;
  };

  return {
    selectedUsuario,
    searchTerm,
    isOpen,
    isLoading,
    error,
    displayedUsuarios,
    shouldSearch,
    selectUsuario,
    clearSelection,
    openDropdown,
    closeDropdown,
    handleInputBlur,
    setInitialUsuario,
  };
}
