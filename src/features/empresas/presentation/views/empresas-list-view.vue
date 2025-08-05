<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import EmpresasFilters from "../components/empresas-filters.vue";
import type { IEmpresa } from "../../interfaces/IEmpresa";
import type { PaginationProps } from "@/shared/interfaces/data-table.types";
import { useEmpresasTableColumns } from "../components/empresas-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";

const {
  empresas,
  loading,
  searchQuery,
  statusFilter,
  paginationProps,
  onEdit,
  onDelete,
  onAdd,
  onUpdateSearch,
  onUpdateStatusFilter,
  onClearFilters,
} = defineProps<{
  empresas: IEmpresa[];
  loading?: boolean;
  searchQuery: string;
  statusFilter: boolean | undefined;
  paginationProps: PaginationProps;
  onEdit?: (empresa: IEmpresa) => void;
  onDelete?: (empresa: IEmpresa) => void;
  onAdd?: () => void;
  onUpdateSearch: (query: string) => void;
  onUpdateStatusFilter: (status: boolean | undefined) => void;
  onClearFilters: () => void;
}>();

const columns = useEmpresasTableColumns({ onEdit, onDelete });
const emptyMessage = "No hay empresas registradas";
</script>

<template>
  <ContentLayout title="Empresas">
    <div class="space-y-6">
      <div
        class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div class="flex-1 w-full lg:w-auto">
          <EmpresasFilters
            :search-query="searchQuery"
            :status-filter="statusFilter"
            :on-update-search="onUpdateSearch"
            :on-update-status-filter="onUpdateStatusFilter"
            :on-clear-filters="onClearFilters"
          />
        </div>
        <div class="w-full lg:w-auto">
          <Button @click="onAdd" class="w-full lg:w-auto">
            <Plus class="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
      </div>
      <div class="rounded-md bg-white px-6 py-4">
        <DataTable
          :data="empresas"
          :columns="columns"
          :loading="loading"
          :empty-message="emptyMessage"
          :pagination="true"
          :pagination-props="paginationProps"
        />
      </div>
    </div>
  </ContentLayout>
</template>
