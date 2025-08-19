<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Edit, Eye, AlertTriangle } from "lucide-vue-next";

const props = defineProps<{
  onEdit?: () => void;
  onViewDetails?: () => void;
  onViewAlarmas?: () => void;
}>();
</script>

<template>
  <div class="flex justify-center gap-1">
    <Button
      variant="ghost"
      size="sm"
      class="text-orange-500 hover:text-orange-800"
      @click.stop="props.onViewAlarmas"
      title="Ver Alarmas"
    >
      <AlertTriangle class="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      class="text-yellow-500 hover:text-yellow-800"
      @click.stop="props.onViewDetails"
      title="Ver Detalles"
    >
      <Eye class="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      class="text-blue-600 hover:text-blue-700"
      @click.stop="props.onEdit"
      title="Editar"
    >
      <Edit class="h-4 w-4" />
    </Button>
  </div>
</template>
