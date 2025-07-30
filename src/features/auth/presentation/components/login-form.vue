<script setup lang="ts">
import useLogin from "../../composables/use-login";
import { Input } from "@progress/kendo-vue-inputs";
import { Button } from "@progress/kendo-vue-buttons";
import { useForm } from "../../../../lib/composables/use-form";
import { User, Lock, Loader2 } from "lucide-vue-next";
import "../styles/login-form.css";

const { schema, onSubmit, isLoading } = useLogin();
const { formData, errors, handleSubmit, validateField } = useForm(schema, {
  usuario: "",
  contrasenia: "",
});

const submitForm = () => handleSubmit(onSubmit);
</script>

<template>
  <form @submit.prevent="submitForm" class="login-form">
    <div class="form-header">
      <h2 class="form-title">Iniciar Sesión</h2>
      <p class="form-subtitle">
        Ingresa tus credenciales para acceder al sistema
      </p>
    </div>

    <div class="form-group">
      <label for="usuario" class="form-label">Nombre de usuario</label>
      <div class="input-wrapper">
        <User class="input-icon" />
        <Input
          id="usuario"
          v-model="formData.usuario"
          @input="validateField('usuario')"
          placeholder="usuario"
          class="form-input"
          :class="{ error: errors.usuario }"
        />
      </div>
      <transition name="error-fade">
        <p v-if="errors.usuario" class="form-error">{{ errors.usuario }}</p>
      </transition>
    </div>

    <div class="form-group">
      <label for="contrasenia" class="form-label">Contraseña</label>
      <div class="input-wrapper">
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
