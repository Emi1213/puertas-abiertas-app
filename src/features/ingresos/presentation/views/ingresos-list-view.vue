<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import IngresosFilters from "../components/ingresos-filters.vue";
import { useIngresosTableColumns } from "../components/ingresos-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";
import type { IIngresosListViewProps } from "../../interfaces/IIngresosListView";

const props = defineProps<IIngresosListViewProps>();

const columns = useIngresosTableColumns({
  onRecognize: props.onRecognize,
  onEdit: props.onEdit,
  onDelete: props.onDelete,
});
const emptyMessage = "No hay ingresos registrados";
</script>

<template>
  <ContentLayout title="Ingresos">
    <div class="space-y-6">
      <div
        class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div class="flex-1 w-full lg:w-auto">
          <IngresosFilters
            :search-query="props.searchQuery"
            :on-update-search="props.onUpdateSearch"
            :on-clear-filters="props.onClearFilters"
          />
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
          :data="props.ingresos"
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
