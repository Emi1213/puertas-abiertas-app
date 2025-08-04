<script lang="ts" setup>
import { DrawerClose } from "vaul-vue";

// Definir las props manualmente ya que DrawerCloseProps no está disponible
const props = defineProps<{
  asChild?: boolean;
}>();
</script>

<template>
  <DrawerClose data-slot="drawer-close" v-bind="props">
    <slot />
  </DrawerClose>
</template>
