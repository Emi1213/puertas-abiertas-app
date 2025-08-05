<script setup lang="ts">
import { watch, ref } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CompanyForm from "./company-form.vue";
import type { ICreateCompany } from "../../interfaces/ICompany";

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateCompany) => Promise<void>;
  initialData?: Partial<ICreateCompany>;
}>();

const open = ref(props.isOpen);

watch(
  () => props.isOpen,
  (v) => (open.value = v)
);
watch(open, (v) => !v && props.onClose());
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {{ props.initialData ? "Editar Empresa" : "Agregar Empresa" }}
        </DialogTitle>
        <DialogDescription class="sr-only">
          Formulario para agregar o editar una empresa
        </DialogDescription>
      </DialogHeader>
      <CompanyForm
        :onSubmit="props.onSubmit"
        :initialData="props.initialData"
      />
    </DialogContent>
  </Dialog>
</template>
