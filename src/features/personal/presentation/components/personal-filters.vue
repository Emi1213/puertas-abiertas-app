<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-vue-next";
import EmpresaAutocomplete from "./empresa-autocomplete.vue";
import { computed, ref, watch } from "vue";
import type { IEmpresa } from "@/features/empresas/interfaces/IEmpresa";
import { useEmpresas } from "@/features/empresas/composables/queries/use-empresas";

const props = defineProps<{
  searchQuery: string;
  statusFilter: boolean | undefined;
  empresaFilter: number | undefined;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onUpdateEmpresaFilter: (empresaId: number | undefined) => void;
  onClearFilters: () => void;
}>();

const selectedEmpresa = ref<IEmpresa | null>(null);

const { data: empresas } = useEmpresas();

watch(
  [() => props.empresaFilter, empresas],
  ([empresaId, empresasList]) => {
    if (empresaId && empresasList) {
      const empresa = empresasList.find((e) => e.id === empresaId);
      selectedEmpresa.value = empresa || null;
    } else {
      selectedEmpresa.value = null;
    }
  },
  { immediate: true }
);

const searchModel = computed({
  get: () => props.searchQuery,
  set: (value: string) => props.onUpdateSearch(value),
});

const statusFilterModel = computed({
  get: () => {
    if (props.statusFilter === undefined) return "all";
    return props.statusFilter ? "active" : "inactive";
  },
  set: (value: string) => {
    if (value === "all") props.onUpdateStatusFilter(undefined);
    else if (value === "active") props.onUpdateStatusFilter(true);
    else if (value === "inactive") props.onUpdateStatusFilter(false);
  },
});

const handleEmpresaChange = (empresaId: number | undefined) => {
  props.onUpdateEmpresaFilter(empresaId);
};

const handleEmpresaModelChange = (empresa: IEmpresa | null) => {
  selectedEmpresa.value = empresa;
};

const handleClearFilters = () => {
  selectedEmpresa.value = null;
  props.onClearFilters();
};
</script>
<template>
  <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
    <div class="flex-1 min-w-0 w-full sm:w-auto">
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <Input
          v-model="searchModel"
          placeholder="Buscar personal..."
          class="pl-10 w-full"
        />
      </div>
    </div>
    <div class="w-full sm:w-auto sm:min-w-48">
      <EmpresaAutocomplete
        id="empresa-filter"
        placeholder="Filtrar por empresa..."
        :model-value="selectedEmpresa"
        :show-clear-option="true"
        :show-all-empresas="true"
        @update:empresaId="handleEmpresaChange"
        @update:modelValue="handleEmpresaModelChange"
      />
    </div>

    <div class="w-full sm:w-auto">
      <Select v-model="statusFilterModel">
        <SelectTrigger class="w-full sm:w-32">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Activo</SelectItem>
          <SelectItem value="inactive">Inactivo</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button
      variant="outline"
      @click="handleClearFilters"
      class="w-full sm:w-auto"
    >
      <X class="w-4 h-4 mr-2" />
      Limpiar
    </Button>
  </div>
</template>
