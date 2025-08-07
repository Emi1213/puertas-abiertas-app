<template>
  <div class="relative">
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

      <div
        v-else-if="displayedEmpresas.length === 0"
        class="p-3 text-center text-gray-500"
      >
        No se encontraron empresas activas
      </div>

      <div
        v-for="empresa in displayedEmpresas"
        :key="empresa.id"
        class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        @click="selectEmpresa(empresa)"
      >
        <div>{{ empresa.nombre }}</div>
      </div>
    </div>
    <div v-if="!isOpen && !selectedEmpresa" class="text-xs text-gray-400 mt-1">
      Haga clic para ver las empresas disponibles
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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
}

interface Emits {
  "update:modelValue": [value: IEmpresa | null];
  "update:empresaId": [value: number | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  id: "empresa-autocomplete",
  placeholder: "Buscar empresa...",
});

const emit = defineEmits<Emits>();

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
  handleInputBlur,
  setInitialEmpresa,
} = useEmpresasAutocomplete();

const hasError = computed(() => !!props.errorMessage);

const selectEmpresa = (empresa: IEmpresa) => {
  selectEmpresaComposable(empresa);
  emit("update:modelValue", empresa);
  emit("update:empresaId", empresa.id);
};

const clearSelection = () => {
  clearSelectionComposable();
  emit("update:modelValue", null);
  emit("update:empresaId", undefined);
};

const onInputChange = () => {
  if (!selectedEmpresa.value) {
    emit("update:modelValue", null);
    emit("update:empresaId", undefined);
  }
};
if (props.modelValue && !selectedEmpresa.value) {
  setInitialEmpresa(props.modelValue);
}
</script>
