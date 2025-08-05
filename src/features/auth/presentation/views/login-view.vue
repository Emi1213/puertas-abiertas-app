<script setup lang="ts">
import LoginForm from "../components/login-form.vue";
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 overflow-hidden px-2 sm:px-0"
  >
    <div class="text-center mb-4 sm:mb-5">
      <div class="text-center">
        <h1
          class="text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem] font-bold text-slate-800 tracking-tight mb-[2px]"
        >
          Puertas Abiertas
        </h1>
        <p
          class="text-slate-500 text-[0.8rem] sm:text-[0.85rem] font-normal m-0"
        >
          Gestión de acceso a instalaciones
        </p>
      </div>
    </div>

    <div
      class="bg-white border border-slate-200 rounded-[10px] sm:rounded-[12px] shadow-md px-3 py-4 sm:px-5 sm:py-5 w-full max-w-[340px] flex justify-center"
    >
      <LoginForm />
    </div>
  </div>
</template>
