<script setup lang="ts">
import LoadingListSkeleton from "@/shared/components/loading-list-skeleton.vue";
import { useUsers } from "../../composables/queries/use-users";
const { data: users, isLoading, isError } = useUsers();
</script>

<template>
  <LoadingListSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-500">Error al cargar usuarios.</div>
  <template v-else>
    <slot :users="users ?? []" />
  </template>
</template>
