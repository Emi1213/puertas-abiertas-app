<script lang="ts" setup>
import { DrawerTrigger } from "vaul-vue";

// Definir las props manualmente ya que DrawerTriggerProps no está disponible
const props = defineProps<{
  asChild?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <DrawerTrigger data-slot="drawer-trigger" v-bind="props">
    <slot />
  </DrawerTrigger>
</template>
