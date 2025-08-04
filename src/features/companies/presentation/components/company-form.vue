<script setup lang="ts">
import { useCompanyForm } from "../../composables/use-company-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { ICreateCompany } from "../../interfaces/ICompany";

const props = defineProps<{
  onSubmit: (data: ICreateCompany) => Promise<void>;
  initialData?: Partial<ICreateCompany>;
}>();
const { formData, errors, handleSubmit, validateField } = useCompanyForm(
  props.initialData
);
</script>
<template>
  <form @submit.prevent="handleSubmit(props.onSubmit)" class="space-y-4">
    <div>
      <Label for="nombre" class="mb-3">Nombre</Label>
      <Input v-model="formData.nombre" @blur="() => validateField('nombre')" />
      <p class="text-xs text-red-500">{{ errors.nombre }}</p>
    </div>
    <div class="flex items-center gap-2">
      <Label for="estado">Activo</Label>
      <Switch id="estado" v-model="formData.estado" />
    </div>
    <Button type="submit" class="w-full">Guardar</Button>
  </form>
</template>
