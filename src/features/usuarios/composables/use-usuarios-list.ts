import { ref } from "vue";
import type {
  ICreateUsuario,
  IUpdateUsuario,
  IUsuario,
} from "../interfaces/IUsuario";
import { useCreateUsuario } from "./mutations/use-create-usuario";
import { useUpdateUsuario } from "./mutations/use-update-usuario";
import { useDeleteUsuario } from "./mutations/use-delete-usuario";

export function useUsuariosList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const usuarioToDelete = ref<IUsuario | null>(null);
  const initialData = ref<Partial<IUsuario>>();
  const createUsuario = useCreateUsuario();
  const updateUsuario = useUpdateUsuario();
  const deleteUsuario = useDeleteUsuario();

  const openAddDrawer = () => {
    initialData.value = undefined;
    drawerOpen.value = true;
  };

  const openEditDrawer = (usuario: IUsuario) => {
    initialData.value = usuario;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    initialData.value = undefined;
  };

  const handleDelete = (usuario: IUsuario) => {
    usuarioToDelete.value = usuario;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    if (usuarioToDelete.value) {
      await deleteUsuario.mutateAsync(usuarioToDelete.value.id);
      usuarioToDelete.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelDelete = () => {
    usuarioToDelete.value = null;
    confirmDialogOpen.value = false;
  };

  const handleSubmit = async (data: ICreateUsuario | IUpdateUsuario) => {
    if (initialData.value && initialData.value.id) {
      const updateData: IUpdateUsuario = {
        ...data,
        id: initialData.value.id,
      };
      await updateUsuario.mutateAsync(updateData);
    } else {
      await createUsuario.mutateAsync(data as ICreateUsuario);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    usuarioToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleDelete,
    confirmDelete,
    cancelDelete,
    handleSubmit,
  };
}
