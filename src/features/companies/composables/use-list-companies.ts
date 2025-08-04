import { ref } from "vue";
import { useCreateCompany } from "./mutations/use-create-company";
import { useUpdateCompany } from "./mutations/use-update-company";
import { useDeleteCompany } from "./mutations/use-delete-company";
import type {
  ICompany,
  ICreateCompany,
  IUpdateCompany,
} from "../interfaces/ICompany";

export function useListCompanies() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const companyToDelete = ref<ICompany | null>(null);
  const initialData = ref<Partial<ICompany>>();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();

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
