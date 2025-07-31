<script setup lang="ts">
import useLogin from "../../composables/use-login";
import { useForm } from "../../../../lib/composables/use-form";
import { User, Lock, Loader2 } from "lucide-vue-next";
import "../styles/login-form.css";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Button from "@/components/ui/button/Button.vue";

const { schema, onSubmit, isLoading } = useLogin();
const { formData, errors, handleSubmit, validateField } = useForm(schema, {
  usuario: "",
  contrasenia: "",
});

const submitForm = () => handleSubmit(onSubmit);
</script>

<template>
  <form @submit.prevent="submitForm" class="w-full max-w-85">
    <div class="text-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900 m-0 mb-1">
        Iniciar Sesión
      </h2>
      <p class="text-gray-500 text-sm m-0 font-normal">
        Ingresa tus credenciales para acceder al sistema
      </p>
    </div>
    <div class="mb-4">
      <Label
        for="usuario"
        class="block font-semibold mb-1.5 text-gray-700 text-xs"
      >
        Nombre de usuario
      </Label>
      <div class="relative flex items-center">
        <User class="input-icon" />
        <Input
          id="usuario"
          v-model="formData.usuario"
          @input="validateField('usuario')"
          placeholder="Ingresa tu nombre de usuario"
          class="form-input"
          :class="{ error: errors.usuario }"
        />
      </div>
      <transition name="error-fade">
        <p v-if="errors.usuario" class="form-error">{{ errors.usuario }}</p>
      </transition>
    </div>

    <div class="mb-4">
      <Label
        for="contrasenia"
        class="block font-semibold mb-1.5 text-gray-700 text-xs"
      >
        Contraseña
      </Label>
      <div class="relative flex items-center">
        <Lock class="input-icon" />
        <Input
          id="contrasenia"
          type="password"
          v-model="formData.contrasenia"
          @input="validateField('contrasenia')"
          placeholder="••••••••"
          class="form-input"
          :class="{ error: errors.contrasenia }"
        />
      </div>
      <transition name="error-fade">
        <p v-if="errors.contrasenia" class="form-error">
          {{ errors.contrasenia }}
        </p>
      </transition>
    </div>

    <Button
      :disabled="isLoading"
      theme-color="primary"
      class="form-button"
      :class="{ loading: isLoading }"
    >
      <div class="button-content">
        <Loader2 v-if="isLoading" class="loading-spinner" />
        <span>{{ isLoading ? "Iniciando sesión..." : "Iniciar Sesión" }}</span>
      </div>
    </Button>
  </form>
</template>
