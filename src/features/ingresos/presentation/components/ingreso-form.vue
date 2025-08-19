<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimePicker from "@/shared/components/date-time-picker.vue";
import PersonalAutocomplete from "@/features/personal/presentation/components/personal-autocomplete.vue";
import EmpresaAutocomplete from "@/features/personal/presentation/components/empresa-autocomplete.vue";
import { useIngresoForm } from "../../composables/use-ingreso-form";
import { useCreateIngreso } from "../../composables/mutations/use-create-ingreso";
import type { ICreateIngreso } from "../../interfaces/IIngreso";

const {
  formData,
  errors,
  loading,
  selectedEmpresa,
  selectedPersonal,
  motivosOptions,
  minDate,
  maxDate,
  handleEmpresaChange,
  handleEmpresaModelChange,
  handlePersonalChange,
  handlePersonalModelChange,
  handleFormSubmit,
  validateField,
} = useIngresoForm();

const { mutateAsync: createIngreso } = useCreateIngreso();

const onSubmit = async () => {
  await handleFormSubmit(async (data) => {
    const ingresoData: ICreateIngreso = {
      personalId: data.personalId,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      duracion: data.duracion,
      comentario: data.comentario,
      idMotivo: data.idMotivo,
      tipoMotivo: data.tipoMotivo,
      causa: data.causa,
      fechaRecon: data.fechaRecon,
      usuarioReconId: data.usuarioReconId,
      estado: data.estado || "ACTIVO",
    };

    await createIngreso(ingresoData);
  });
};

// Computed para manejar fechaFin como puede ser undefined
const fechaFinModel = computed({
  get: () => formData.fechaFin || null,
  set: (value: Date | null) => {
    formData.fechaFin = value || undefined;
    validateField("fechaFin");
  },
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6 bg-white p-6 rounded-lg">
    <!-- Autocompletado de Empresa -->
    <div class="space-y-2">
      <EmpresaAutocomplete
        label="Empresa"
        placeholder="Buscar empresa..."
        :model-value="selectedEmpresa"
        :show-all-empresas="true"
        @update:modelValue="handleEmpresaModelChange"
        @update:empresaId="handleEmpresaChange"
      />
      <p class="text-xs text-gray-500">
        Selecciona una empresa para filtrar el personal disponible
      </p>
    </div>

    <div class="space-y-2">
      <PersonalAutocomplete
        label="Personal"
        placeholder="Buscar personal..."
        :model-value="selectedPersonal"
        :empresa-id="selectedEmpresa?.id"
        :require-empresa="true"
        :error-message="errors.personalId || undefined"
        @update:modelValue="handlePersonalModelChange"
        @update:personalId="handlePersonalChange"
      />
    </div>

    <div class="space-y-2">
      <Label class="text-sm font-medium">Tipo de Motivo</Label>
      <Select
        v-model="formData.tipoMotivo"
        @update:modelValue="() => validateField('tipoMotivo')"
      >
        <SelectTrigger
          class="h-10"
          :class="{ 'border-red-500': errors.tipoMotivo }"
        >
          <SelectValue placeholder="Seleccionar motivo..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in motivosOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <div v-if="errors.tipoMotivo" class="text-sm text-red-500">
        {{ errors.tipoMotivo }}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <DateTimePicker
          v-model="formData.fechaInicio"
          label="Fecha de Inicio"
          :min="minDate"
          :max="maxDate"
          :error="errors.fechaInicio"
          @update:modelValue="() => validateField('fechaInicio')"
        />
      </div>
      <div class="space-y-2">
        <DateTimePicker
          v-model="fechaFinModel"
          label="Fecha de Fin (Opcional)"
          :min="minDate"
          :max="maxDate"
          :error="errors.fechaFin"
          placeholder="Dejar vacío si está en progreso"
        />
      </div>
    </div>

    <div class="space-y-2">
      <Label class="text-sm font-medium">Comentario</Label>
      <Textarea
        v-model="formData.comentario"
        placeholder="Agregar comentario..."
        rows="3"
        class="resize-none"
      />
    </div>
    <div class="flex justify-end gap-3 pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        :disabled="loading"
        @click="$router.push({ name: 'ingresos' })"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? "Guardando..." : "Guardar" }}
      </Button>
    </div>
  </form>
</template>
