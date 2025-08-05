<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import { useUsersTableColumns } from "../components/users-table-columns";
import type { IUsuariosListViewProps } from "../../interfaces/IUsuariosListView";

const props = defineProps<IUsuariosListViewProps>();
const {
  usuarios,
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
} = props;

const columns = useUsersTableColumns({ onEdit, onDelete });

const emptyMessage = "No hay usuarios registrados";
</script>

<template>
  <ContentLayout title="Usuarios">
    <DataTable
      :data="usuarios"
      :columns="columns"
      :loading="loading"
      :empty-message="emptyMessage"
    />
  </ContentLayout>
</template>
