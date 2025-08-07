import { ref } from "vue";
import type {
  ICreatePersonal,
  IUpdatePersonal,
  IPersonal,
} from "../interfaces/IPersonal";
import { useCreatePersonal } from "./mutations/use-create-personal";
import { useUpdatePersonal } from "./mutations/use-update-personal";
import { useDeletePersonal } from "./mutations/use-delete-personal";

export function usePersonalList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const personalToDelete = ref<IPersonal | null>(null);
  const initialData = ref<Partial<IPersonal>>();
  const createPersonal = useCreatePersonal();
  const updatePersonal = useUpdatePersonal();
  const deletePersonal = useDeletePersonal();

  const openAddDrawer = () => {
    initialData.value = undefined;
    drawerOpen.value = true;
  };

  const openEditDrawer = (personal: IPersonal) => {
    initialData.value = personal;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    initialData.value = undefined;
  };

  const handleDelete = (personal: IPersonal) => {
    personalToDelete.value = personal;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    if (personalToDelete.value) {
      await deletePersonal.mutateAsync(personalToDelete.value.id);
      personalToDelete.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelDelete = () => {
    personalToDelete.value = null;
    confirmDialogOpen.value = false;
  };

  const handleSubmit = async (data: ICreatePersonal | IUpdatePersonal) => {
    if (initialData.value && initialData.value.id) {
      const updateData: IUpdatePersonal = {
        ...data,
        id: initialData.value.id,
      };
      await updatePersonal.mutateAsync(updateData);
    } else {
      await createPersonal.mutateAsync(data as ICreatePersonal);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    personalToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleDelete,
    confirmDelete,
    cancelDelete,
    handleSubmit,
  };
}
