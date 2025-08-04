<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { DrawerTitle } from "vaul-vue";
import { cn } from "@/lib/utils";

// Definir las props manualmente ya que DrawerTitleProps no está disponible
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="delegatedProps"
    :class="cn('text-foreground font-semibold', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>
