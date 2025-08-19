import { useForm } from "@/lib/composables/use-form";
import { ref, computed } from "vue";
import { z } from "zod";
import type { IPerfil, ICreatePerfil } from "../interfaces/IPerfil";

export const perfilSchema = z.object({
  nombre: z
    .string()
    .nonempty({ message: "El nombre del perfil es requerido." }),
  descripcion: z.string().optional(),
  modulosIds: z
    .array(z.number())
    .min(1, { message: "Debe seleccionar al menos un módulo." }),
});

export function usePerfilForm(initialData?: Partial<IPerfil>) {
  const loading = ref(false);
  const isEditing = computed(() => !!initialData && "id" in initialData);

  const getInitialModulosIds = () => {
    if (!initialData?.modulos) return [];
    return initialData.modulos.map((modulo) => modulo.id);
  };

  const {
    formData,
    errors,
    handleSubmit: originalHandleSubmit,
    validateField,
    resetForm,
  } = useForm(perfilSchema, {
    nombre: initialData?.nombre ?? "",
    descripcion: initialData?.descripcion ?? "",
    modulosIds: getInitialModulosIds(),
  });

  const handleSubmit = (onValid: (data: ICreatePerfil) => Promise<void>) => {
    return originalHandleSubmit(async (data) => {
      if (loading.value) return;
      loading.value = true;
      try {
        const perfilData: ICreatePerfil = {
          nombre: data.nombre,
          descripcion: data.descripcion || null,
          modulosIds: data.modulosIds,
        };
        await onValid(perfilData);
      } finally {
        loading.value = false;
      }
    });
  };

  return {
    formData,
    errors,
    loading,
    isEditing,
    handleSubmit,
    validateField,
    resetForm,
  };
}
