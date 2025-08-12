<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import Button from "@/components/ui/button/Button.vue";
import CustomBreadcrumb from "@/shared/components/custom-breadcrumb.vue";
import { ArrowLeft, Save, X } from "lucide-vue-next";
import type { IIngresosFormViewProps } from "../../interfaces/IIngresosFormView";

const props = defineProps<IIngresosFormViewProps>();

const breadcrumbItems = [
  { label: "Ingresos", href: "/ingresos" },
  { label: props.isEditing ? "Editar" : "Nuevo", href: "#" },
];


const handleFormSubmit = async () => {

};
</script>

<template>
  <ContentLayout :title="isEditing ? 'Editar Ingreso' : 'Nuevo Ingreso'">
    <div class="space-y-6">
      <!-- Breadcrumb -->
      <CustomBreadcrumb :items="breadcrumbItems" />

      <!-- Header con acciones -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Button
            variant="outline"
            @click="props.onCancel"
            class="flex items-center space-x-2"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>Volver</span>
          </Button>
        </div>

        <div class="flex items-center space-x-3">
          <Button
            variant="outline"
            @click="props.onCancel"
            class="flex items-center space-x-2"
          >
            <X class="w-4 h-4" />
            <span>Cancelar</span>
          </Button>

          <Button @click="handleFormSubmit" class="flex items-center space-x-2">
            <Save class="w-4 h-4" />
            <span>{{ isEditing ? "Actualizar" : "Guardar" }}</span>
          </Button>
        </div>
      </div>

      <!-- Contenido del formulario -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="space-y-6">
          <div class="text-center py-12 text-gray-500">
            <h3 class="text-lg font-medium mb-2">Formulario de Ingreso</h3>
            <p class="text-sm">
              El formulario completo será implementado en la siguiente fase.
            </p>
            <p class="text-xs mt-2 text-gray-400">
              Por ahora, hacer clic en "Guardar" creará un registro de ejemplo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
