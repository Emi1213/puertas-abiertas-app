<template>
  <div ref="containerRef" class="relative">
    <Label v-if="label" :for="id">{{ label }}</Label>
    <div class="relative">
      <Input
        :id="id"
        v-model="searchTerm"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'pr-10',
          { 'border-red-500': hasError, 'opacity-50': disabled },
        ]"
        @focus="openDropdown"
        @blur="handleInputBlur"
        @input="onInputChange"
      />

      <button
        v-if="selectedPersonal && !disabled"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearSelection"
      >
        <X class="h-4 w-4" />
      </button>
      <div
        v-else-if="isLoading && shouldSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <div
          class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"
        ></div>
      </div>
    </div>
    <div v-if="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </div>
    <div
      v-if="disabled && !empresaId && requireEmpresa"
      class="text-xs text-gray-500 mt-1"
    >
      Selecciona una empresa primero
    </div>
    <div
      v-if="isOpen && !disabled"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div v-if="isLoading" class="p-3 text-center text-gray-500">
        Buscando personal...
      </div>

      <template v-else>
        <div
          v-if="displayedPersonal.length === 0"
          class="p-3 text-center text-gray-500"
        >
          {{
            empresaId
              ? "No se encontró personal en esta empresa"
              : "No se encontró personal activo"
          }}
        </div>

        <div
          v-for="person in displayedPersonal"
          :key="person.id"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          @click="selectPersonal(person)"
        >
          <div class="flex items-center gap-3">
            <!-- Avatar con iniciales -->
            <div
              class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium"
            >
              {{ getInitials(person.nombres, person.apellidos) }}
            </div>
            <div>
              <div class="font-medium text-gray-900">
                {{ person.nombres }} {{ person.apellidos }}
              </div>
              <div class="text-sm text-gray-500">
                {{ person.empresa.nombre }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { usePersonalAutocomplete } from "../../composables/use-personal-autocomplete";
import type { IPersonal } from "../../interfaces/IPersonal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: IPersonal | null;
  errorMessage?: string;
  empresaId?: number | undefined; // Para filtrar por empresa
  requireEmpresa?: boolean; // Si es true, requiere empresa seleccionada
}

interface Emits {
  "update:modelValue": [value: IPersonal | null];
  "update:personalId": [value: number | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  id: "personal-autocomplete",
  placeholder: "Buscar personal...",
  requireEmpresa: false,
});

const emit = defineEmits<Emits>();

// Referencia al contenedor del componente
const containerRef = ref<HTMLElement>();

// El componente está deshabilitado solo si requireEmpresa es true y no hay empresaId
const disabled = computed(() => props.requireEmpresa && !props.empresaId);

const {
  selectedPersonal,
  searchTerm,
  isOpen,
  isLoading,
  displayedPersonal,
  shouldSearch,
  selectPersonal: selectPersonalComposable,
  clearSelection: clearSelectionComposable,
  openDropdown,
  closeDropdown,
  handleInputBlur,
  setInitialPersonal,
} = usePersonalAutocomplete(computed(() => props.empresaId));

const hasError = computed(() => !!props.errorMessage);

// Función para obtener iniciales
const getInitials = (nombres: string, apellidos: string): string => {
  const nombresInitial = nombres.charAt(0).toUpperCase();
  const apellidosInitial = apellidos.charAt(0).toUpperCase();
  return `${nombresInitial}${apellidosInitial}`;
};

const selectPersonal = (person: IPersonal) => {
  selectPersonalComposable(person);
  emit("update:modelValue", person);
  emit("update:personalId", person.id);
};

const clearSelection = () => {
  clearSelectionComposable();
  closeDropdown();
  emit("update:modelValue", null);
  emit("update:personalId", undefined);
};

const onInputChange = () => {
  if (!selectedPersonal.value) {
    emit("update:modelValue", null);
    emit("update:personalId", undefined);
  }
};

// Limpiar selección cuando cambia la empresa
watch(
  () => props.empresaId,
  (newEmpresaId, oldEmpresaId) => {
    if (newEmpresaId !== oldEmpresaId && selectedPersonal.value) {
      // Si cambió la empresa y hay personal seleccionado, verificar si pertenece a la nueva empresa
      if (!newEmpresaId || selectedPersonal.value.empresa.id !== newEmpresaId) {
        clearSelection();
      }
    }
  }
);

// Cerrar dropdown al hacer clic fuera
const handleClickOutside = (event: Event) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    closeDropdown();
  }
};

// Agregar/remover listener de clicks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Inicializar si hay valor inicial
if (props.modelValue && !selectedPersonal.value) {
  setInitialPersonal(props.modelValue);
}
</script>
