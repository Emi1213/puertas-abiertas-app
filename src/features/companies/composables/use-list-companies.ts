import { ref } from "vue";
import { useCreateCompany } from "./mutations/use-create-company";
// import { useUpdateCompany } from "./mutations/use-update-company";
import type {
  ICompany,
  ICreateCompany,
  IUpdateCompany,
} from "../interfaces/ICompany";

export function useListCompanies() {
  const drawerOpen = ref(false);
  const initialData = ref<Partial<ICompany>>();
  const createCompany = useCreateCompany();
//   const updateCompany = useUpdateCompany();

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

  const handleSubmit = async (data: ICreateCompany | IUpdateCompany) => {
    if ("id" in data && data.id) {
    //   await updateCompany.mutateAsync(data);
    } else {
      await createCompany.mutateAsync(data as ICreateCompany);
    }
    drawerOpen.value = false;
  };

  return {
    drawerOpen,
    initialData,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    handleSubmit,
  };
}
