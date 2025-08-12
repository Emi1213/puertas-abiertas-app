<script setup lang="ts">
import type { IPersonal } from "@/features/personal/interfaces/IPersonal";

defineProps<{
  personal?: IPersonal;
}>();
</script>

<template>
  <div v-if="!personal" class="text-gray-400 italic">Sin asignar</div>

  <div v-else class="text-gray-800">
    {{ `${personal.nombres} ${personal.apellidos}` }}
  </div>
</template>
