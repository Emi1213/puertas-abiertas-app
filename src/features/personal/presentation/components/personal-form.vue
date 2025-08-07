<script setup lang="ts">
import { ref } from "vue";
import { usePersonalForm } from "../../composables/use-personal-form";
import type { ICreatePersonal, IPersonal } from "../../interfaces/IPersonal";
import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EmpresaAutocomplete from "./empresa-autocomplete.vue";

interface Props {
  initialData?: Partial<ICreatePersonal> | Partial<IPersonal>;
  onSubmit: (datos: ICreatePersonal) => Promise<void>;
  onCancel: () => void;
}

const props = defineProps<Props>();

const {
  formData,
  errors,
  isLoading,
  hasErrors,
  isEditing,
  validateField,
  handleSubmit,
} = usePersonalForm(props.initialData, props.onSubmit);

const selectedEmpresa = ref<IEmpresa | null>(null);

if (
  props.initialData &&
  "empresa" in props.initialData &&
  props.initialData.empresa
) {
  selectedEmpresa.value = props.initialData.empresa;
}

const handleEmpresaChange = (empresaId: number | undefined) => {
  if (empresaId) {
    formData.empresaId = empresaId;
    validateField("empresaId");
  }
};

const handleEmpresaModelChange = (empresa: IEmpresa | null) => {
  selectedEmpresa.value = empresa;
};
</script>
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <Label for="nombres">Nombres</Label>
      <Input
        id="nombres"
        v-model="formData.nombres"
        placeholder="Ingrese los nombres"
        :class="{ 'border-red-500': errors.nombres }"
        @blur="validateField('nombres')"
      />
      <div v-if="errors.nombres" class="text-sm text-red-500">
        {{ errors.nombres }}
      </div>
    </div>
    <div class="space-y-2">
      <Label for="apellidos">Apellidos</Label>
      <Input
        id="apellidos"
        v-model="formData.apellidos"
        placeholder="Ingrese los apellidos"
        :class="{ 'border-red-500': errors.apellidos }"
        @blur="validateField('apellidos')"
      />
      <div v-if="errors.apellidos" class="text-sm text-red-500">
        {{ errors.apellidos }}
      </div>
    </div>

    <div class="space-y-2">
      <EmpresaAutocomplete
        id="empresa"
        label="Empresa"
        placeholder="Buscar y seleccionar empresa..."
        :model-value="selectedEmpresa"
        :error-message="errors.empresaId || undefined"
        @update:empresaId="handleEmpresaChange"
        @update:modelValue="handleEmpresaModelChange"
      />
    </div>
    <div class="flex items-center space-x-2">
      <Switch id="estado" v-model="formData.estado" />
      <Label for="estado">Activo</Label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <Button
        type="button"
        variant="outline"
        @click="onCancel"
        :disabled="isLoading"
      >
        Cancelar
      </Button>
      <Button type="submit" :disabled="isLoading || hasErrors">
        <span v-if="isLoading">Guardando...</span>
        <span v-else>{{ isEditing ? "Actualizar" : "Crear" }}</span>
      </Button>
    </div>
  </form>
</template>
