<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
  searchQuery: string;
  onUpdateSearch: (query: string) => void;
  onClearFilters: () => void;
}>();

const searchModel = computed({
  get: () => props.searchQuery,
  set: (value: string) => props.onUpdateSearch(value),
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
          placeholder="Buscar ingresos..."
          class="pl-10 w-full"
        />
      </div>
    </div>
    <Button variant="outline" @click="onClearFilters" class="w-full sm:w-auto">
      <X class="w-4 h-4 mr-2" />
      Limpiar
    </Button>
  </div>
</template>
