<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}>();

const open = ref(props.isOpen);
watch(
  () => props.isOpen,
  (v) => (open.value = v)
);
watch(open, (v) => !v && props.onClose());

const isDesktop = useMediaQuery("(min-width: 768px)");
const [DefineSlot, ReuseSlot] = createReusableTemplate();
</script>

<template>
  <DefineSlot>
    <slot />
  </DefineSlot>

  <Dialog v-if="isDesktop" v-model:open="open">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <ReuseSlot />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="open">
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{ title }}</DrawerTitle>
        <DrawerDescription>{{ description }}</DrawerDescription>
      </DrawerHeader>
      <div class="px-4 pb-6">
        <ReuseSlot />
      </div>
    </DrawerContent>
  </Drawer>
</template>
