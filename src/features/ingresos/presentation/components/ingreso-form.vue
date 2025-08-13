<script setup lang="ts">
import { ref } from "vue";
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
import PersonalAutocomplete from "./personal-autocomplete.vue";

// Solo datos básicos para el UI
const fechaInicio = ref<Date | null>(new Date());
const fechaFin = ref<Date | null>(null);
const motivo = ref("");
const comentario = ref("");

const motivosOptions = [
  { value: "INCIDENTE", label: "Incidente" },
  { value: "CAMBIO", label: "Cambio" },
  { value: "OTROS", label: "Otros" },
];

const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);
</script>

<template>
  <form class="space-y-6 bg-white p-6 rounded-lg">
    <div class="space-y-2">
      <PersonalAutocomplete label="Personal" placeholder="Buscar personal..." />
    </div>
    <div class="space-y-2">
      <Label class="text-sm font-medium">Tipo de Motivo</Label>
      <Select v-model="motivo">
        <SelectTrigger class="h-10">
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
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <DateTimePicker
          v-model="fechaInicio"
          label="Fecha de Inicio"
          :min="minDate"
          :max="maxDate"
        />
      </div>
      <div class="space-y-2">
        <DateTimePicker
          v-model="fechaFin"
          label="Fecha de Fin (Opcional)"
          :min="minDate"
          :max="maxDate"
          placeholder="Dejar vacío si está en progreso"
        />
      </div>
    </div>

    <div class="space-y-2">
      <Label class="text-sm font-medium">Comentario</Label>
      <Textarea
        v-model="comentario"
        placeholder="Agregar comentario..."
        rows="3"
        class="resize-none"
      />
    </div>
    <div class="flex justify-end gap-3 pt-4 border-t">
      <Button type="button" variant="outline"> Cancelar </Button>
      <Button type="submit" class="bg-blue-600 hover:bg-blue-700">
        Guardar
      </Button>
    </div>
  </form>
</template>
