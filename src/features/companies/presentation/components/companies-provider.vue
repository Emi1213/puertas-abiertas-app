<script setup lang="ts">
import LoadingListSkeleton from "@/shared/components/ui/loading-list-skeleton.vue";
import { useCompanies } from "../../composables/queries/use-companies";
const { data: companies, isLoading, isError } = useCompanies();
</script>
<template>
  <LoadingListSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-500">Error al cargar empresas.</div>
  <template v-else>
    <slot :companies="companies ?? []" />
  </template>
</template>
