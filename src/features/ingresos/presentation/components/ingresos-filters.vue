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
import { computed } from "vue";
import { TODAS_ESTADOS_OPCIONES } from "../../interfaces/EstadosIngreso";

const props = defineProps<{
  searchQuery: string;
  statusFilter?: string | undefined;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter?: (status: string | undefined) => void;
  onClearFilters: () => void;
}>();

const searchModel = computed({
  get: () => props.searchQuery,
  set: (value: string) => props.onUpdateSearch(value),
});

const statusFilterModel = computed({
  get: () => props.statusFilter || "all",
  set: (value: string) => {
    if (props.onUpdateStatusFilter) {
      if (value === "all") props.onUpdateStatusFilter(undefined);
      else props.onUpdateStatusFilter(value);
    }
  },
});

const statusOptions = [
  { value: "all", label: "Todos" },
  ...TODAS_ESTADOS_OPCIONES.map((estado) => ({
    value: estado.value.toLowerCase().replace(/\s+/g, ""),
    label: estado.label,
  })),
];
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
          placeholder="Buscar ingresos..."
          class="pl-10 w-full"
        />
      </div>
    </div>
    <div class="w-full sm:w-auto" v-if="onUpdateStatusFilter">
      <Select v-model="statusFilterModel">
        <SelectTrigger class="w-full sm:w-40">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in statusOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button variant="outline" @click="onClearFilters" class="w-full sm:w-auto">
      <X class="w-4 h-4 mr-2" />
      Limpiar
    </Button>
  </div>
</template>
