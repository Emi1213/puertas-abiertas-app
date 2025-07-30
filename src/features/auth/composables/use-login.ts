import { ref } from "vue";
import { useToast } from "vue-toastification";
import { z } from "zod";

import { AuthDataSource } from "../services/datasource";

interface LoginForm {
  usuario: string;
  contrasenia: string;
}

export default function useLogin() {
  const isLoading = ref(false);

  const schema = z.object({
    usuario: z
      .string()
      .nonempty({ message: "El usuario es requerido." })
      .min(3, { message: "El usuario debe tener al menos 3 caracteres." })
      .max(100, {
        message: "El usuario debe tener como máximo 100 caracteres.",
      }),

    contrasenia: z
      .string()
      .nonempty({ message: "La contraseña es requerida." })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
      .max(100, {
        message: "La contraseña debe tener como máximo 100 caracteres.",
      }),
  });

  async function onSubmit(form: LoginForm) {
    if (isLoading.value) return;

    const toast = useToast();
    isLoading.value = true;
    try {
      await AuthDataSource.getInstance().login(form);
      toast.success("Inicio de sesión exitoso.");
    } catch (error) {
      toast.error("Error al iniciar sesión.");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    schema,
    onSubmit,
  };
}
