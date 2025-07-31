<script setup lang="ts">
import LoginForm from "../components/login-form.vue";
import "../styles/login-view.css";
</script>

<template>
  <div class="login-container">
    <div class="system-header">
      <div class="system-info">
        <h1 class="system-title">Puertas Abiertas</h1>
        <p class="system-subtitle">Gestión de acceso a instalaciones</p>
      </div>
    </div>
    <div class="login-card">
      <LoginForm />
    </div>
  </div>
</template>
