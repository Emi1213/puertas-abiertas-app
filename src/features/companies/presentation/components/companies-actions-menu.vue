<script setup lang="ts">
import type { ICompany } from "../../interfaces/ICompany";
import { Button } from "@/components/ui/button";

defineProps<{
  company: ICompany;
  onEdit?: () => void;
  onDelete?: () => void;
}>();
</script>

<template>
  <div class="flex justify-center gap-2">
    <Button
      variant="ghost"
      size="sm"
      class="text-blue-600 hover:text-blue-700"
      @click.stop="onEdit"
    >
      Editar
    </Button>

    <Button
      variant="ghost"
      size="sm"
      class="text-red-600 hover:text-red-700"
      @click.stop="onDelete"
    >
      Eliminar
    </Button>
  </div>
</template>
