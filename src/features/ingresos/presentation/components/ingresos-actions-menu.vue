<script setup lang="ts">
import type { IIngreso } from "../../interfaces/IIngreso";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Edit, Trash2 } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
  ingreso: IIngreso;
  onRecognize?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}>();

// Computed para determinar si el ingreso ya fue reconocido
const isAlreadyRecognized = computed(() => {
  return !!(props.ingreso.fechaRecon && props.ingreso.usuarioReconId);
});

// Computed para el título dinámico del botón de reconocer
const recognizeButtonTitle = computed(() => {
  return isAlreadyRecognized.value ? "Ya reconocido" : "Reconocer";
});
</script>

<template>
  <div class="flex justify-center gap-1">
    <Button
      variant="ghost"
      size="sm"
      :class="{
        'text-green-600 hover:text-green-700': !isAlreadyRecognized,
        'text-gray-400 cursor-not-allowed': isAlreadyRecognized,
      }"
      :disabled="isAlreadyRecognized"
      @click.stop="onRecognize"
      :title="recognizeButtonTitle"
    >
      <CheckCircle2 class="h-4 w-4" />
    </Button>

    <Button
      variant="ghost"
      size="sm"
      class="text-blue-600 hover:text-blue-700"
      @click.stop="onEdit"
      title="Editar"
    >
      <Edit class="h-4 w-4" />
    </Button>

    <Button
      variant="ghost"
      size="sm"
      class="text-red-600 hover:text-red-700"
      @click.stop="onDelete"
      title="Eliminar"
    >
      <Trash2 class="h-4 w-4" />
    </Button>
  </div>
</template>
