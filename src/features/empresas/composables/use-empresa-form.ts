import { useForm } from "@/lib/composables/use-form";
import { ref } from "vue";
import { z } from "zod";

export const empresaSchema = z.object({
  nombre: z
    .string()
    .nonempty({ message: "El nombre de la empresa es requerido." }),
  estado: z.boolean().default(true),
});

export function useEmpresaForm(
  initialData?: Partial<z.infer<typeof empresaSchema>>
) {
  const loading = ref(false);
  const {
    formData,
    errors,
    handleSubmit: originalHandleSubmit,
    validateField,
    resetForm,
  } = useForm(empresaSchema, {
    nombre: initialData?.nombre ?? "",
    estado: initialData?.estado ?? true,
  });

  const handleSubmit = (
    onValid: (data: z.infer<typeof empresaSchema>) => Promise<void>
  ) => {
    return originalHandleSubmit(async (data) => {
      if (loading.value) return;
      loading.value = true;
      try {
        await onValid(data);
      } finally {
        loading.value = false;
      }
    });
  };

  return {
    formData,
    errors,
    loading,
    handleSubmit,
    validateField,
    resetForm,
  };
}
