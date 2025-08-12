<script setup lang="ts">
import type { IUsuario } from "@/features/usuarios/interfaces/IUsuario";
import { formatDate, isValidDate } from "../../../utils/date-formatters";

const props = defineProps<{
  fechaRecon?: Date | string;
  usuarioReconId?: number | null;
  usuarioRecon?: IUsuario;
}>();

const isRecognized = !!(props.fechaRecon && props.usuarioReconId);

const formattedDate =
  props.fechaRecon && isValidDate(props.fechaRecon)
    ? formatDate(props.fechaRecon)
    : null;

const usuarioInfo = props.usuarioRecon?.nombre || "Sistema";
const tooltipText = formattedDate
  ? `Reconocido el ${formattedDate.tooltip} por ${usuarioInfo}`
  : "";
</script>

<template>
  <div
    v-if="isRecognized && formattedDate"
    class="flex items-center justify-center gap-1 text-green-700 cursor-help"
    :title="tooltipText"
  >
    <span class="text-xs font-mono">
      {{ formattedDate.short }}
    </span>
  </div>

  <div v-else class="flex items-center justify-center gap-1 text-amber-600">
    <span class="text-xs font-mono">Pendiente</span>
  </div>
</template>
