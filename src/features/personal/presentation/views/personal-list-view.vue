<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import type { IPersonalListViewProps } from "../../interfaces/IPersonalListView";
import { usePersonalTableColumns } from "../components/personal-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";
import DataTable from "@/shared/components/data-table/data-table.vue";

const props = defineProps<IPersonalListViewProps>();

const columns = usePersonalTableColumns({
  onEdit: props.onEdit,
  onDelete: props.onDelete,
});
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
