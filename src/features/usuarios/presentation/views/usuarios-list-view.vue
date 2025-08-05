<script setup lang="ts">
import type { IUsuario } from "../../interfaces/IUsuario";
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import { useUsersTableColumns } from "../components/users-table-columns";

const { users, loading, onEdit, onDelete } = defineProps<{
  users: IUsuario[];
  loading?: boolean;
  onEdit?: (user: IUsuario) => void;
  onDelete?: (user: IUsuario) => void;
}>();

const columns = useUsersTableColumns({
  onEdit,
  onDelete,
});

const emptyMessage = "No hay usuarios registrados";
</script>

<template>
  <ContentLayout title="Usuarios">
    <DataTable
      :data="users"
      :columns="columns"
      :loading="loading"
      :empty-message="emptyMessage"
    />
  </ContentLayout>
</template>
