<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import IngresoForm from "../components/ingreso-form.vue";
</script>

<template>
  <ContentLayout title="Nuevo Ingreso">
    <div class="flex flex-col items-center">
      <div class="w-full max-w-3xl">
        <IngresoForm />
      </div>
    </div>
  </ContentLayout>
</template>
