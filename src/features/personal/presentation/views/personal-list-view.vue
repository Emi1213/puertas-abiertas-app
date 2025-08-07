<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import type { IPersonalListViewProps } from "../../interfaces/IPersonalListView";

const props = defineProps<IPersonalListViewProps>();

const emptyMessage = "No se encontraron resultados.";
</script>
<template>
  <ContentLayout>
    <div class="space-y-6">
      <div
        class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div class="flex-1 w-full lg:w-auto">
          <!-- <UsuariosFilters
            :search-query="props.searchQuery"
            :profile-filter="props.profileFilter"
            :perfiles="props.perfiles"
            :on-update-search="props.onUpdateSearch"
            :on-update-profile-filter="props.onUpdateProfileFilter"
            :on-clear-filters="props.onClearFilters"
          /> -->
        </div>
        <div class="w-full lg:w-auto">
          <Button @click="props.onAdd" class="w-full lg:w-auto">
            <Plus class="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
      </div>
      <div class="rounded-md bg-white px-6 py-4">
        <DataTable
          :data="props.personal"
          :columns="columns"
          :loading="props.loading"
          :empty-message="emptyMessage"
          :pagination="true"
          :pagination-props="props.paginationProps"
        />
      </div>
    </div>
  </ContentLayout>
</template>
