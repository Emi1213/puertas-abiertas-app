import { ref } from "vue";
import { useCreatePerfil } from "./mutations/use-create-perfil";
import { useUpdatePerfil } from "./mutations/use-update-perfil";
import { useDeletePerfil } from "./mutations/use-delete-perfil";
import type {
  IPerfil,
  ICreatePerfil,
  IUpdatePerfil,
} from "../interfaces/IPerfil";

export function usePerfilesList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const perfilToDelete = ref<IPerfil | null>(null);
  const initialData = ref<Partial<IPerfil>>();
  const createPerfil = useCreatePerfil();
  const updatePerfil = useUpdatePerfil();
  const deletePerfil = useDeletePerfil();

  const openAddDrawer = () => {
    initialData.value = undefined;
    drawerOpen.value = true;
  };

  const openEditDrawer = (perfil: IPerfil) => {
    initialData.value = perfil;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    initialData.value = undefined;
  };

  const handleDelete = (perfil: IPerfil) => {
    perfilToDelete.value = perfil;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    if (perfilToDelete.value) {
      await deletePerfil.mutateAsync(perfilToDelete.value.id);
      perfilToDelete.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelDelete = () => {
    perfilToDelete.value = null;
    confirmDialogOpen.value = false;
  };

  const handleSubmit = async (data: ICreatePerfil | IUpdatePerfil) => {
    if (initialData.value && initialData.value.id) {
      const updateData: IUpdatePerfil = {
        ...data,
        id: initialData.value.id,
      };
      await updatePerfil.mutateAsync(updateData);
    } else {
      await createPerfil.mutateAsync(data as ICreatePerfil);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    perfilToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
