<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import PerfilesFilters from "../components/perfiles-filters.vue";
import { usePerfilesTableColumns } from "../components/perfiles-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";
import type { IPerfilesListViewProps } from "../../interfaces/IPerfilesListView";

const props = defineProps<IPerfilesListViewProps>();

const columns = usePerfilesTableColumns({
  onEdit: props.onEdit,
  onDelete: props.onDelete,
});

const emptyMessage = "No hay perfiles registrados";
</script>

<template>
  <ContentLayout title="Perfiles">
    <div class="space-y-6">
      <div
        class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div class="flex-1 w-full lg:w-auto">
          <PerfilesFilters
            :search-query="props.searchQuery"
            :on-update-search="props.onUpdateSearch"
            :on-clear-filters="props.onClearFilters"
          />
        </div>
        <div class="w-full lg:w-auto">
          <Button @click="props.onAdd" class="w-full lg:w-auto">
            <Plus class="w-4 h-4 mr-1" />
            Agregar Perfil
          </Button>
        </div>
      </div>
      <div class="rounded-md bg-white px-6 py-4">
        <DataTable
          :data="props.perfiles"
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
