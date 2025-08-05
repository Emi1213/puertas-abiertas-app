import { ref } from "vue";
import { useToast } from "vue-toastification";
import { z } from "zod";
import { useRouter } from "vue-router";

import { AuthDataSource } from "../services/datasource";
import { useAuthStore } from "../context/auth-store";

export interface LoginForm {
  usuario: string;
  contrasenia: string;
}

export default function useLogin() {
  const router = useRouter();
  const isLoading = ref(false);
  const { getUser } = useAuthStore();

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
      toast.success(`Bienvenido ${getUser()?.usuario}!`);
      await router.push("/companies");
    } catch (error) {
      toast.error(
        "Error al iniciar sesión." +
          (error instanceof Error ? `: ${error.message}` : "")
      );
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
