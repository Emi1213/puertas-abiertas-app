import { ref } from "vue";
import { useRouter } from "vue-router";
import type { IIngreso } from "../interfaces/IIngreso";
import { useRecognizeIngresos } from "./mutations/use-recognize-ingresos";

export function useIngresosList() {
  const router = useRouter();
  const drawerOpen = ref(false);
  const initialData = ref<IIngreso | null>(null);
  const confirmDialogOpen = ref(false);
  const ingresoToDelete = ref<IIngreso | null>(null);
  const ingresoToRecognize = ref<IIngreso | null>(null);

  const recognizeIngreso = useRecognizeIngresos();

  const openAddDrawer = () => {
    // Navegar a la página de nuevo ingreso
    router.push("/ingresos/nuevo");
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
    ingresoToRecognize.value = ingreso;
    confirmDialogOpen.value = true;
  };

  const confirmRecognize = async () => {
    if (ingresoToRecognize.value) {
      await recognizeIngreso.mutateAsync(ingresoToRecognize.value.id);
      ingresoToRecognize.value = null;
    }
    confirmDialogOpen.value = false;
  };

  const cancelRecognize = () => {
    ingresoToRecognize.value = null;
    confirmDialogOpen.value = false;
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
    ingresoToRecognize,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
    handleRecognize,
    confirmRecognize,
    cancelRecognize,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
}
