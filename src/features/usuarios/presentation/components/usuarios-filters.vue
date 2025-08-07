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
import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";

const props = defineProps<{
  searchQuery: string;
  profileFilter: number | undefined;
  perfiles: IPerfil[];
  onUpdateSearch: (query: string) => void;
  onUpdateProfileFilter: (profile: number | undefined) => void;
  onClearFilters: () => void;
}>();

const searchModel = computed({
  get: () => props.searchQuery,
  set: (value: string) => props.onUpdateSearch(value),
});

const profileFilterModel = computed({
  get: () => {
    if (props.profileFilter === undefined) return "all";
    return props.profileFilter.toString();
  },
  set: (value: string) => {
    if (value === "all") props.onUpdateProfileFilter(undefined);
    else props.onUpdateProfileFilter(parseInt(value));
  },
});
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
          placeholder="Buscar usuarios..."
          class="pl-10 w-full"
        />
      </div>
    </div>
    <div class="w-full sm:w-auto">
      <Select v-model="profileFilterModel">
        <SelectTrigger class="w-full sm:w-48">
          <SelectValue placeholder="Filtrar por perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los perfiles</SelectItem>
          <SelectItem
            v-for="perfil in perfiles"
            :key="perfil.id"
            :value="perfil.id.toString()"
          >
            {{ perfil.nombre }}
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
