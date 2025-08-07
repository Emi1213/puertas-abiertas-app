import { ref } from "vue";
import type { IPersonal } from "../interfaces/IPersonal";

export function usePersonalList() {
  const drawerOpen = ref(false);
  const confirmDialogOpen = ref(false);
  const personalToDelete = ref<IPersonal | null>(null);
  const initialData = ref<Partial<IPersonal>>();

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

  //   const confirmDelete = async () => {
  //     if (personalToDelete.value) {
  //       await deletePersonal.mutateAsync(personalToDelete.value.id);
  //       personalToDelete.value = null;
  //     }
  //     confirmDialogOpen.value = false;
  //   };

  const cancelDelete = () => {
    personalToDelete.value = null;
    confirmDialogOpen.value = false;
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
    cancelDelete,
    // confirmDelete,
    // handleSubmit,
  };
}
