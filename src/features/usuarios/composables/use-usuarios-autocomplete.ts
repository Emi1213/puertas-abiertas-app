
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import type { ComputedRef } from "vue";
import type { IUsuarioActiveDirectory } from "../interfaces/IUsuarioActiveDirectory";
import type { IUsuarioActiveDirectoryFilters } from "../interfaces/IUsuarioFilters";
import { useUsuariosActiveDirectory } from "./queries/use-active-directory";

export function useUsuariosAdAutocomplete() {
  const containerRef = ref<HTMLElement>();
  const selectedUsuario = ref<IUsuarioActiveDirectory | null>(null);
  const isOpen = ref(false);
  const searchTerm = ref("");

  const enabled = computed(() => isOpen.value);
  const filters: ComputedRef<IUsuarioActiveDirectoryFilters> = computed(() => ({
    query: searchTerm.value || undefined,
  }));

  const {
    data: usuarios,
    isFetching,
    error,
  } = useUsuariosActiveDirectory(filters, enabled);

  const displayedUsuarios = computed<IUsuarioActiveDirectory[]>(() =>
    isOpen.value
      ? (usuarios.value as any)?.items ?? (usuarios.value as any) ?? []
      : []
  );

  const selectUsuario = (usuario: IUsuarioActiveDirectory) => {
    selectedUsuario.value = usuario;
    searchTerm.value = usuario.nombreParaMostrar || usuario.samAccountName;
    isOpen.value = false;
  };

  const clearSelection = () => {
    selectedUsuario.value = null;
    searchTerm.value = "";
  };

  const openDropdown = async () => {
    isOpen.value = true;
    await nextTick();
  };

  const closeDropdown = () => {
    isOpen.value = false;
  };

  const setInitialUsuario = (usuario: IUsuarioActiveDirectory | null) => {
    selectedUsuario.value = usuario;
    searchTerm.value =
      usuario?.nombreParaMostrar || usuario?.samAccountName || "";
  };

  const onPointerDownOutside = (e: PointerEvent) => {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
      closeDropdown();
    }
  };
  onMounted(() =>
    document.addEventListener("pointerdown", onPointerDownOutside)
  );
  onUnmounted(() =>
    document.removeEventListener("pointerdown", onPointerDownOutside)
  );

  return {

    containerRef,
    selectedUsuario,
    searchTerm,
    isOpen,
    isFetching,
    error,
    displayedUsuarios,
    selectUsuario,
    clearSelection,
    openDropdown,
    closeDropdown,
    setInitialUsuario,
  };
}
