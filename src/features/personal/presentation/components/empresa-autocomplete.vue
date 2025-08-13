<template>
  <div ref="containerRef" class="relative">
    <Label v-if="label" :for="id">{{ label }}</Label>
    <div class="relative">
      <Input
        :id="id"
        v-model="searchTerm"
        :placeholder="placeholder"
        :class="['pr-10', { 'border-red-500': hasError }]"
        @focus="openDropdown"
        @blur="handleInputBlur"
        @input="onInputChange"
      />

      <button
        v-if="selectedEmpresa"
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
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div v-if="isLoading" class="p-3 text-center text-gray-500">
        Buscando empresas...
      </div>

      <template v-else>
        <!-- Opción para limpiar selección (solo en filtros) -->
        <div
          v-if="showClearOption"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 text-gray-600 italic"
          @click="clearSelection"
        >
          Todas las empresas
        </div>

        <div
          v-if="displayedEmpresas.length === 0"
          class="p-3 text-center text-gray-500"
        >
          {{
            showAllEmpresas
              ? "No se encontraron empresas"
              : "No se encontraron empresas activas"
          }}
        </div>

        <div
          v-for="empresa in displayedEmpresas"
          :key="empresa.id"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          @click="selectEmpresa(empresa)"
        >
          <div class="flex items-center justify-between">
            <span>{{ empresa.nombre }}</span>
            <span
              v-if="showAllEmpresas"
              :class="[
                'text-xs px-2 py-1 rounded-full',
                empresa.estado
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700',
              ]"
            >
              {{ empresa.estado ? "Activa" : "Inactiva" }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useEmpresasAutocomplete } from "../../composables/use-empresas-autocomplete";
import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: IEmpresa | null;
  errorMessage?: string;
  showClearOption?: boolean; // Para mostrar opción de limpiar cuando es filtro
  showAllEmpresas?: boolean;
}

interface Emits {
  "update:modelValue": [value: IEmpresa | null];
  "update:empresaId": [value: number | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  id: "empresa-autocomplete",
  placeholder: "Buscar empresa...",
  showClearOption: false,
  showAllEmpresas: false,
});

const emit = defineEmits<Emits>();

// Referencia al contenedor del componente
const containerRef = ref<HTMLElement>();

const {
  selectedEmpresa,
  searchTerm,
  isOpen,
  isLoading,
  displayedEmpresas,
  shouldSearch,
  selectEmpresa: selectEmpresaComposable,
  clearSelection: clearSelectionComposable,
  openDropdown,
  closeDropdown,
  handleInputBlur,
  setInitialEmpresa,
} = useEmpresasAutocomplete(props.showAllEmpresas);

const hasError = computed(() => !!props.errorMessage);

const selectEmpresa = (empresa: IEmpresa) => {
  selectEmpresaComposable(empresa);
  emit("update:modelValue", empresa);
  emit("update:empresaId", empresa.id);
};

const clearSelection = () => {
  clearSelectionComposable();
  closeDropdown();
  emit("update:modelValue", null);
  emit("update:empresaId", undefined);
};

const onInputChange = () => {
  if (!selectedEmpresa.value) {
    emit("update:modelValue", null);
    emit("update:empresaId", undefined);
  }
};

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

if (props.modelValue && !selectedEmpresa.value) {
  setInitialEmpresa(props.modelValue);
}
</script>
