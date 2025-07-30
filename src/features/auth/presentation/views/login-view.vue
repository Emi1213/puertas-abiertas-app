<script setup lang="ts">
import LoginForm from "../components/login-form.vue";
import "../styles/login-view.css";
</script>

<template>
  <div class="login-container">
    <div class="system-header">
      <div class="logo-container">
        <div class="system-info">
          <h1 class="system-title">Sistema de Ingresos</h1>
          <p class="system-subtitle">Gestión de acceso a instalaciones</p>
        </div>
      </div>
    </div>
    <div class="login-card">
      <LoginForm />
    </div>
  </div>
</template>
