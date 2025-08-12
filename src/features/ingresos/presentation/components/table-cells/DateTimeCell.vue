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
  <div v-if="!formattedDate" class="text-sm text-gray-400 italic">
    {{ emptyMessage || "No especificado" }}
  </div>

  <div v-else class="text-center">
    <div class="text-sm text-gray-800">
      {{ formattedDate.date }}
    </div>
    <div v-if="showTime" class="text-xs text-gray-600 mt-1">
      {{ formattedDate.time }}
    </div>
  </div>
</template>
