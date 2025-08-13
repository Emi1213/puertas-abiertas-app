import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import type { IIngreso } from "../interfaces/IIngreso";

export function useIngresoForm() {
  const router = useRouter();
  const initialData = ref<IIngreso | null>(null);

  return {
    initialData,
  };
}
