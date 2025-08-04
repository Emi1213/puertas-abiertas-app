<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="flex flex-col h-full p-4 sm:p-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">{{ title }}</h1>
      <Separator class="my-4" />
    </div>
    <ScrollArea
      class="flex-1 rounded-md border border-slate-200 shadow-sm p-4 bg-white"
    >
      <slot />
    </ScrollArea>
  </div>
</template>
