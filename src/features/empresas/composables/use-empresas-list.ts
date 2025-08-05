import { ref } from "vue";
import { useCreateEmpresa } from "./mutations/use-create-empresa";
import { useUpdateEmpresa } from "./mutations/use-update-empresa";
import { useDeleteEmpresa } from "./mutations/use-delete-empresa";
import type {
  ICompany,
  ICreateCompany,
  IUpdateCompany,
} from "../interfaces/ICompany";

export function useEmpresasList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const companyToDelete = ref<ICompany | null>(null);
  const initialData = ref<Partial<ICompany>>();
  const createCompany = useCreateEmpresa();
  const updateCompany = useUpdateEmpresa();
  const deleteCompany = useDeleteEmpresa();

  const openAddDrawer = () => {
    initialData.value = undefined;
    drawerOpen.value = true;
  };

  const openEditDrawer = (company: ICompany) => {
    initialData.value = company;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
  };

  const handleDelete = (company: ICompany) => {
    companyToDelete.value = company;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    if (companyToDelete.value) {
      await deleteCompany.mutateAsync(companyToDelete.value.id);
      companyToDelete.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelDelete = () => {
    companyToDelete.value = null;
    confirmDialogOpen.value = false;
  };

  const handleSubmit = async (data: ICreateCompany | IUpdateCompany) => {
    if (initialData.value && initialData.value.id) {
      const updateData: IUpdateCompany = {
        ...data,
        id: initialData.value.id,
      };
      await updateCompany.mutateAsync(updateData);
    } else {
      await createCompany.mutateAsync(data as ICreateCompany);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    companyToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
