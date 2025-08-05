<script lang="ts" setup>
import { DrawerTrigger } from "vaul-vue";

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
