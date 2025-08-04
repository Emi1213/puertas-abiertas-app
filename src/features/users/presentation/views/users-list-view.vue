<script setup lang="ts">
import type { IUser } from "../../interfaces/IUser";
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/ui/data-table/data-table.vue";
import { useUsersTableColumns } from "../components/users-table-columns";

const { users, loading, onEdit, onDelete } = defineProps<{
  users: IUser[];
  loading?: boolean;
  onEdit?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
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
