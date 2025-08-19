<script setup lang="ts">
import LoadingListSkeleton from "@/shared/components/loading-list-skeleton.vue";
import { useModulos } from "../../composables/queries/use-modulos";

const { data: modulos, isLoading, isError } = useModulos();
</script>

<template>
  <LoadingListSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-500">Error al cargar módulos.</div>
  <template v-else>
    <slot :modulos="modulos ?? []" />
  </template>
</template>
