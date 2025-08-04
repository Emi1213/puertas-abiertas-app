import { useForm } from "@/lib/composables/use-form";
import { z } from "zod";

export const companySchema = z.object({
  nombre: z
    .string()
    .nonempty({ message: "El nombre de la empresa es requerido." }),
  estado: z.boolean().default(true),
});

export function useCompanyForm(
  initialData?: Partial<z.infer<typeof companySchema>>
) {
  const { formData, errors, handleSubmit, validateField, resetForm } = useForm(
    companySchema,
    {
      nombre: initialData?.nombre ?? "",
      estado: initialData?.estado ?? true,
    }
  );

  console.log("useCompanyForm initialized with data:", initialData);

  return {
    formData,
    errors,
    handleSubmit,
    validateField,
    resetForm,
  };
}
