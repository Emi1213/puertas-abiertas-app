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

const props = defineProps<{
  searchQuery: string;
  statusFilter: boolean | undefined;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onClearFilters: () => void;
}>();

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
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
    <!-- Búsqueda -->
    <div class="flex-1 min-w-0 w-full sm:w-auto">
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <Input
          v-model="searchModel"
          placeholder="Buscar empresas..."
          class="pl-10 w-full"
        />
      </div>
    </div>

    <!-- Filtro por estado -->
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

    <!-- Botón limpiar -->
    <Button variant="outline" @click="onClearFilters" class="w-full sm:w-auto">
      <X class="w-4 h-4 mr-2" />
      Limpiar
    </Button>
  </div>
</template>
