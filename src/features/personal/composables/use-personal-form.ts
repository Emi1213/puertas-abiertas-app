import { computed, ref } from "vue";
import { z } from "zod";
import { useForm } from "@/lib/composables/use-form";
import type { ICreatePersonal } from "../interfaces/IPersonal";

const personalSchema = z.object({
  nombres: z.string().min(1, "Los nombres son requeridos"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  empresaId: z.number().min(1, "Debe seleccionar una empresa"),
  estado: z.boolean(),
});

export function usePersonalForm(
  initialData?:
    | Partial<ICreatePersonal>
    | Partial<import("../interfaces/IPersonal").IPersonal>,
  onSubmit?: (datos: ICreatePersonal) => Promise<void>
) {
  const isLoading = ref(false);
  const isEditing = computed(() => !!initialData && "id" in initialData);

  const getEmpresaId = () => {
    if (!initialData) return undefined;
    if ("empresaId" in initialData) return initialData.empresaId;
    if ("empresa" in initialData && initialData.empresa)
      return initialData.empresa.id;
    return undefined;
  };

  const {
    formData,
    errors,
    validateField,
    resetForm,
    handleSubmit: formHandleSubmit,
  } = useForm(personalSchema, {
    nombres: initialData?.nombres || "",
    apellidos: initialData?.apellidos || "",
    empresaId: getEmpresaId(),
    estado: initialData?.estado ?? true,
  });

  const hasErrors = computed(() => {
    const hasValidationErrors = Object.values(errors.value).some(
      (error) => error !== null && error !== ""
    );

    const isFormValid =
      formData.nombres &&
      formData.apellidos &&
      formData.empresaId &&
      formData.empresaId > 0;

    return hasValidationErrors || !isFormValid;
  });

  const handleSubmitWithLoading = async () => {
    if (isLoading.value || !onSubmit) return;

    try {
      isLoading.value = true;
      await formHandleSubmit(onSubmit as any);
    } catch (error) {
    } finally {
      isLoading.value = false;
    }
  };

  return {
    formData,
    errors,
    isLoading,
    hasErrors,
    isEditing,
    validateField,
    resetForm,
    handleSubmit: handleSubmitWithLoading,
  };
}
