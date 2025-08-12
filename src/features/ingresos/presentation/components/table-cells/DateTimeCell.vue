<script setup lang="ts">
import { formatDate, isValidDate } from "../../../utils/date-formatters";

const props = defineProps<{
  date?: Date | string;
  showTime?: boolean;
  emptyMessage?: string;
}>();

const formattedDate =
  props.date && isValidDate(props.date) ? formatDate(props.date) : null;
</script>

<template>
  <div v-if="!formattedDate" class="text-gray-400 italic text-xs">
    {{ emptyMessage || "No especificado" }}
  </div>

  <div v-else class="text-xs text-gray-700">
    <div class="text-gray-800">
      {{ formattedDate.date }}
    </div>
    <div v-if="showTime" class="text-xs text-gray-500">
      {{ formattedDate.time }}
    </div>
  </div>
</template>
