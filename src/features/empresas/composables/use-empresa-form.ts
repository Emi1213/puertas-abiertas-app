import { useForm } from "@/lib/composables/use-form";
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
  const { formData, errors, handleSubmit, validateField, resetForm } = useForm(
    empresaSchema,
    {
      nombre: initialData?.nombre ?? "",
      estado: initialData?.estado ?? true,
    }
  );


  return {
    formData,
    errors,
    handleSubmit,
    validateField,
    resetForm,
  };
}
