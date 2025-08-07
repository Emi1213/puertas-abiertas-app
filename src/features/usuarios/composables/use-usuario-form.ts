import { computed, ref } from "vue";
import { z } from "zod";
import { useForm } from "@/lib/composables/use-form";
import type { ICreateUsuario } from "../interfaces/IUsuario";

const createUsuarioSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  perfilId: z.number().min(1, "Debe seleccionar un perfil"),
  contrasenia: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const editUsuarioSchema = z.object({
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
  const isEditing = !!initialData && "id" in initialData;

  const getPerfilId = () => {
    if (!initialData) return undefined;
    if ("perfilId" in initialData) return initialData.perfilId;
    if ("perfil" in initialData && initialData.perfil)
      return initialData.perfil.id;
    return undefined;
  };

  const schema = isEditing ? editUsuarioSchema : createUsuarioSchema;
  const formInitialData: any = isEditing
    ? {
        usuario: initialData?.usuario || "",
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        perfilId: getPerfilId(),
      }
    : {
        usuario: initialData?.usuario || "",
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        perfilId: getPerfilId(),
        contrasenia: "",
      };

  const {
    formData,
    errors,
    validateField,
    resetForm,
    handleSubmit: formHandleSubmit,
  } = useForm(schema, formInitialData);

  const hasErrors = computed(() => {
    const hasValidationErrors = Object.values(errors.value).some(
      (error) => error !== null && error !== ""
    );

    const isFormValid =
      formData.usuario &&
      formData.nombre &&
      formData.perfilId &&
      formData.perfilId > 0 &&
      // Para creación, contraseña es requerida
      (isEditing || (formData.contrasenia && formData.contrasenia.length >= 6));

    return hasValidationErrors || !isFormValid;
  });

  const handleSubmitWithLoading = async () => {
    if (isLoading.value || !onSubmit) return;

    try {
      isLoading.value = true;
      await formHandleSubmit(onSubmit as any);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
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
