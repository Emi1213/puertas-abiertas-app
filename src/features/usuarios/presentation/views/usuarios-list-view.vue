<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import { useUsersTableColumns } from "../components/users-table-columns";
import type { IUsuariosListViewProps } from "../../interfaces/IUsuariosListView";

const props = defineProps<IUsuariosListViewProps>();

const columns = useUsersTableColumns({
  onEdit: props.onEdit,
  onDelete: props.onDelete,
});

const emptyMessage = "No hay usuarios registrados";
</script>

<template>
  <ContentLayout title="Usuarios">
    <DataTable
      :data="props.usuarios"
      :columns="columns"
      :loading="props.loading"
      :empty-message="emptyMessage"
    />
  </ContentLayout>
</template>
