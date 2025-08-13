<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import ContentLayout from "@/core/layout/content-layout.vue";
import IngresoForm from "../components/ingreso-form.vue";
</script>

<template>
  <ContentLayout title="Nuevo Ingreso">
    <div class="flex flex-col items-center">
      <div class="w-full mb-6">
        <Button
          variant="ghost"
          size="sm"
          class="text-gray-600 hover:text-gray-900"
          @click="$router.push({ name: 'ingresos' })"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Volver a Lista
        </Button>
      </div>

      <div class="w-full max-w-3xl">
        <IngresoForm />   
      </div>
    </div>
  </ContentLayout>
</template>
