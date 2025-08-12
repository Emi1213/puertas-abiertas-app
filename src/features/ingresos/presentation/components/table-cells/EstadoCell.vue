<script setup lang="ts">
import Badge from "@/components/ui/badge/Badge.vue";
import { getEstadoConfig } from "../../../utils/estado-formatters";

const props = defineProps<{
  estado?: string;
}>();

const estadoConfig = getEstadoConfig(props.estado);
</script>

<template>
  <Badge :class="estadoConfig.class">
    {{ estadoConfig.text }}
  </Badge>
</template>
