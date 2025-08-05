<script setup lang="ts">
import LoadingListSkeleton from "@/shared/components/loading-list-skeleton.vue";
import { usePerfiles } from "../composables/queries/use-perfiles";

const { data: perfiles, isLoading, isError } = usePerfiles();
</script>
<template>
  <LoadingListSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-500">Error al cargar perfiles.</div>
  <template v-else>
    <slot :perfiles="perfiles ?? []" />
  </template>
</template>
