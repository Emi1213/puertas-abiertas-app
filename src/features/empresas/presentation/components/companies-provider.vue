<script setup lang="ts">
import LoadingListSkeleton from "@/shared/components/loading-list-skeleton.vue";
import { useEmpresas } from "../../composables/queries/use-empresas";
const { data: companies, isLoading, isError } = useEmpresas();
</script>
<template>
  <LoadingListSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-500">Error al cargar empresas.</div>
  <template v-else>
    <slot :companies="companies ?? []" />
  </template>
</template>
