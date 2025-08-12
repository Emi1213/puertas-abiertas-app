import { ref } from "vue";
import type { IIngreso } from "../interfaces/IIngreso";
import { useRecognizeIngresos } from "./mutations/use-recognize-ingresos";

export function useIngresosList() {
  const drawerOpen = ref(false);
  const initialData = ref<IIngreso | null>(null);
  const confirmDialogOpen = ref(false);
  const ingresoToDelete = ref<IIngreso | null>(null);

  const recognizeMutation = useRecognizeIngresos();

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

  const handleSubmit = async (data: IIngreso): Promise<void> => {
    console.log("Submit ingreso:", data);
    closeDrawer();
  };

  const handleRecognize = async (ingreso: IIngreso) => {
    try {
      await recognizeMutation.mutateAsync(ingreso.id);
    } catch (error) {
      console.error("Error al reconocer ingreso:", error);
    }
  };

  const handleDelete = (ingreso: IIngreso) => {
    ingresoToDelete.value = ingreso;
    confirmDialogOpen.value = true;
  };

  const confirmDelete = async () => {
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
    recognizeMutation,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleRecognize,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
