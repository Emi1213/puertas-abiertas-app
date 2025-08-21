import { computed, ref } from "vue";
import { z } from "zod";
import { useForm } from "@/lib/composables/use-form";
import type { ICreateUsuario } from "../interfaces/IUsuario";

const usuarioSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  perfilId: z.number().min(1, "Debe seleccionar un perfil"),
});

export function useUsuarioForm(
  initialData?:
    | Partial<ICreateUsuario>
    | Partial<import("../interfaces/IUsuario").IUsuario>,
  onSubmit?: (datos: ICreateUsuario) => Promise<void>
) {
  const isLoading = ref(false);
  const isEditing = computed(() => !!initialData && "id" in initialData);

  const getPerfilId = () => {
    if (!initialData) return undefined;
    if ("perfilId" in initialData) return initialData.perfilId;
    if ("perfil" in initialData && initialData.perfil)
      return initialData.perfil.id;
    return undefined;
  };

  const formInitialData = {
    usuario: initialData?.usuario || "",
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    perfilId: getPerfilId(),
  };

  const {
    formData,
    errors,
    validateField,
    resetForm,
    handleSubmit: formHandleSubmit,
  } = useForm(usuarioSchema, formInitialData);

  const hasErrors = computed(() => {
    const hasValidationErrors = Object.values(errors.value).some(
      (error) => error !== null && error !== ""
    );

    const isFormValid =
      formData.usuario &&
      formData.nombre &&
      formData.perfilId &&
      formData.perfilId > 0;

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
