import { ref } from "vue";
import { useCreateEmpresa } from "./mutations/use-create-empresa";
import { useUpdateEmpresa } from "./mutations/use-update-empresa";
import { useDeleteEmpresa } from "./mutations/use-delete-empresa";
import type {
  IEmpresa,
  ICreateEmpresa,
  IUpdateEmpresa,
} from "../interfaces/IEmpresa";

export function useEmpresasList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const empresaToDelete = ref<IEmpresa | null>(null);
  const initialData = ref<Partial<IEmpresa>>();
  const createEmpresa = useCreateEmpresa();
  const updateEmpresa = useUpdateEmpresa();
  const deleteEmpresa = useDeleteEmpresa();

  const openAddDrawer = () => {
    initialData.value = undefined;
    drawerOpen.value = true;
  };

  const openEditDrawer = (company: IEmpresa) => {
    initialData.value = company;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
  };

  const handleDelete = (company: IEmpresa) => {
    empresaToDelete.value = company;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    if (empresaToDelete.value) {
      await deleteEmpresa.mutateAsync(empresaToDelete.value.id);
      empresaToDelete.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelDelete = () => {
    empresaToDelete.value = null;
    confirmDialogOpen.value = false;
  };

  const handleSubmit = async (data: ICreateEmpresa | IUpdateEmpresa) => {
    if (initialData.value && initialData.value.id) {
      const updateData: IUpdateEmpresa = {
        ...data,
        id: initialData.value.id,
      };
      await updateEmpresa.mutateAsync(updateData);
    } else {
      await createEmpresa.mutateAsync(data as ICreateEmpresa);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    empresaToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
