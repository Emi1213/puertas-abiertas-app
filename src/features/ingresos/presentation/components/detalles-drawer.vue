<script setup lang="ts">
import { computed } from "vue";
import FormOverlay from "@/shared/components/form-overlay.vue";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  Building2,
  FileText,
  AlertCircle,
} from "lucide-vue-next";
import type { IIngreso } from "../../interfaces/IIngreso";

const props = defineProps<{
  isOpen: boolean;
  ingreso: IIngreso | null;
  onClose: () => void;
}>();

const formatDate = (date: Date | undefined) => {
  if (!date) return "No disponible";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getEstadoBadgeVariant = (estado?: string) => {
  if (!estado) return "outline";
  switch (estado.toLowerCase()) {
    case "enproceso":
    case "en_proceso":
    case "en proceso":
      return "secondary";
    case "registroalarma":
    case "registro_alarma":
    case "registro alarma":
      return "destructive";
    case "cerrado":
      return "default";
    case "alarmadescompuesta":
    case "alarma_descompuesta":
    case "alarma descompuesta":
      return "outline";
    // Estados anteriores por compatibilidad
    case "activo":
    case "en progreso":
      return "default";
    case "completado":
    case "finalizado":
      return "secondary";
    case "pendiente":
      return "destructive";
    default:
      return "outline";
  }
};

const alarmasCount = computed(() => props.ingreso?.alarmas?.length || 0);
const hasAlarmas = computed(() => alarmasCount.value > 0);
</script>

<template>
  <FormOverlay
    :isOpen="isOpen"
    :onClose="onClose"
    :title="'Detalles del Ingreso'"
    size="lg"
  >
    <div v-if="ingreso" class="space-y-6">
      <!-- Header con información principal -->
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ ingreso.personal?.nombres }} {{ ingreso.personal?.apellidos }}
            </h3>
            <p class="text-sm text-gray-500">ID: #{{ ingreso.id }}</p>
          </div>
          <Badge :variant="getEstadoBadgeVariant(ingreso.estado)">
            {{ ingreso.estado || "Sin estado" }}
          </Badge>
        </div>

        <!-- Información de la empresa -->
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Building2 class="h-4 w-4" />
          <span>{{
            ingreso.personal?.empresa?.nombre || "Sin empresa asignada"
          }}</span>
        </div>
      </div>

      <!-- Información temporal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 border-b pb-2">Tiempos</h4>

          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Calendar class="h-5 w-5 text-green-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Fecha de Inicio</p>
                <p class="text-sm text-gray-600">
                  {{ formatDate(ingreso.fechaInicio) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Calendar class="h-5 w-5 text-red-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Fecha de Fin</p>
                <p class="text-sm text-gray-600">
                  {{
                    ingreso.fechaFin
                      ? formatDate(ingreso.fechaFin)
                      : "En progreso"
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Clock class="h-5 w-5 text-blue-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Duración</p>
                <p class="text-sm text-gray-600">
                  {{ ingreso.duracion || "Calculando..." }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 border-b pb-2">
            Información Adicional
          </h4>

          <div class="space-y-3">
            <div v-if="ingreso.tipoMotivo" class="flex items-center gap-3">
              <FileText class="h-5 w-5 text-purple-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Tipo de Motivo</p>
                <p class="text-sm text-gray-600">{{ ingreso.tipoMotivo }}</p>
              </div>
            </div>

            <div v-if="ingreso.causa" class="flex items-center gap-3">
              <AlertCircle class="h-5 w-5 text-orange-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Causa</p>
                <p class="text-sm text-gray-600">{{ ingreso.causa }}</p>
              </div>
            </div>

            <div v-if="ingreso.usuarioRecon" class="flex items-center gap-3">
              <User class="h-5 w-5 text-indigo-500" />
              <div>
                <p class="text-sm font-medium text-gray-700">Reconocido por</p>
                <p class="text-sm text-gray-600">
                  {{ ingreso.usuarioRecon.nombre }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comentarios -->
      <div v-if="ingreso.comentario" class="space-y-2">
        <h4 class="font-medium text-gray-900">Comentarios</h4>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700">{{ ingreso.comentario }}</p>
        </div>
      </div>

      <!-- Información de alarmas -->
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <AlertCircle class="h-5 w-5 text-amber-500" />
          <h4 class="font-medium text-amber-800">Alarmas</h4>
        </div>
        <p class="text-sm text-amber-700">
          {{
            hasAlarmas
              ? `Este ingreso tiene ${alarmasCount} alarma${
                  alarmasCount > 1 ? "s" : ""
                } asociada${alarmasCount > 1 ? "s" : ""}.`
              : "Este ingreso no tiene alarmas asociadas."
          }}
        </p>
        <p v-if="hasAlarmas" class="text-xs text-amber-600 mt-1">
          Usa el botón de alarmas en la tabla para ver más detalles.
        </p>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">No se pudo cargar la información del ingreso.</p>
    </div>
  </FormOverlay>
</template>
