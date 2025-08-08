import { ref } from "vue";
import type { IIngreso } from "../interfaces/IIngreso";

export function useIngresosList() {
  const drawerOpen = ref(false);
  const initialData = ref<IIngreso | null>(null);
  const confirmDialogOpen = ref(false);
  const ingresoToDelete = ref<IIngreso | null>(null);

  const openAddDrawer = () => {
    initialData.value = null;
    drawerOpen.value = true;
  };

  const openEditDrawer = (ingreso: IIngreso) => {
    initialData.value = ingreso;
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    initialData.value = null;
  };

  const handleSubmit = async (data: any) => {
    console.log("Submit ingreso:", data);
    closeDrawer();
  };

  const handleDelete = (ingreso: IIngreso) => {
    ingresoToDelete.value = ingreso;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
    // TODO: Implementar lógica de eliminación cuando sea necesario
    console.log("Delete ingreso:", ingresoToDelete.value);
    confirmDialogOpen.value = false;
    ingresoToDelete.value = null;
  };

  const cancelDelete = () => {
    confirmDialogOpen.value = false;
    ingresoToDelete.value = null;
  };

  return {
    drawerOpen,
    initialData,
    confirmDialogOpen,
    ingresoToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
