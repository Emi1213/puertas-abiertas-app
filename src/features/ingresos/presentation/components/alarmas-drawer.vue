<script setup lang="ts">
import { computed } from "vue";
import FormOverlay from "@/shared/components/form-overlay.vue";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, AlertCircle } from "lucide-vue-next";
import type { IIngreso } from "../../interfaces/IIngreso";

const props = defineProps<{
  isOpen: boolean;
  ingreso: IIngreso | null;
  onClose: () => void;
}>();

const alarmas = computed(() => props.ingreso?.alarmas || []);
const hasAlarmas = computed(() => alarmas.value.length > 0);

const getEstadoBadgeVariant = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "activa":
    case "pendiente":
      return "destructive";
    case "resuelta":
    case "completada":
      return "default";
    case "en progreso":
      return "secondary";
    default:
      return "outline";
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <FormOverlay
    :isOpen="isOpen"
    :onClose="onClose"
    :title="`Alarmas - ${ingreso?.personal?.nombres || 'Personal'}`"
    size="lg"
  >
    <div class="space-y-6">
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center gap-3">
          <AlertCircle class="h-5 w-5 text-orange-500" />
          <div>
            <h3 class="font-medium text-gray-900">
              {{ ingreso?.personal?.nombres }}
              {{ ingreso?.personal?.apellidos }}
            </h3>
            <p class="text-sm text-gray-500">
              Ingreso:
              {{
                ingreso?.fechaInicio
                  ? formatDate(ingreso.fechaInicio)
                  : "Sin fecha"
              }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="hasAlarmas" class="space-y-4">
        <h4 class="text-sm font-medium text-gray-900">
          Alarmas ({{ alarmas.length }})
        </h4>

        <div class="space-y-3">
          <div
            v-for="alarma in alarmas"
            :key="alarma.id"
            class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h5 class="font-medium text-gray-900">{{ alarma.nombre }}</h5>
                  <Badge :variant="getEstadoBadgeVariant(alarma.estado)">
                    {{ alarma.estado }}
                  </Badge>
                </div>

                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays class="h-4 w-4" />
                  <span>{{ formatDate(alarma.fecha) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado sin alarmas -->
      <div v-else class="text-center py-8">
        <AlertCircle class="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Sin alarmas</h3>
        <p class="text-gray-500">
          Este ingreso no tiene alarmas registradas en el momento.
        </p>
      </div>
    </div>
  </FormOverlay>
</template>
