import { ref } from "vue";
import { useRouter } from "vue-router";
import type { IIngreso } from "../interfaces/IIngreso";

export function useIngresosList() {
  const router = useRouter();
  const editDrawerOpen = ref(false);
  const detallesDrawerOpen = ref(false);
  const alarmasDrawerOpen = ref(false);
  const currentIngreso = ref<IIngreso | null>(null);
  const initialData = ref<Partial<IIngreso> | null>(null);
  const openAddDrawer = () => {
    router.push("/ingresos/nuevo");
  };

  const openViewDetails = (ingreso: IIngreso) => {
    currentIngreso.value = ingreso;
    detallesDrawerOpen.value = true;
  };

  const closeDetallesDrawer = () => {
    detallesDrawerOpen.value = false;
    currentIngreso.value = null;
  };

  const openEditDrawer = (ingreso: IIngreso) => {
    initialData.value = ingreso;
    editDrawerOpen.value = true;
  };

  const closeEditDrawer = () => {
    editDrawerOpen.value = false;
    initialData.value = null;
  };

  const openAlarmasDrawer = (ingreso: IIngreso) => {
    currentIngreso.value = ingreso;
    alarmasDrawerOpen.value = true;
  };

  const closeAlarmasDrawer = () => {
    alarmasDrawerOpen.value = false;
    currentIngreso.value = null;
  };

  const handleSubmit = async (data: any) => {
    console.log("Update ingreso:", data);
    closeEditDrawer();
  };

  return {
    editDrawerOpen,
    detallesDrawerOpen,
    alarmasDrawerOpen,
    initialData,
    currentIngreso,
    openAddDrawer,
    openViewDetails,
    closeDetallesDrawer,
    openEditDrawer,
    closeEditDrawer,
    openAlarmasDrawer,
    closeAlarmasDrawer,
    handleSubmit,
  };
}
