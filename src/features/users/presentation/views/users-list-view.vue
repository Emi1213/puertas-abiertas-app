<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import { useUsers } from "../../composables/queries/use-users";
import { useUsersTableColumns } from "../components/users-table-columns";
import DataTable from "@/shared/components/ui/data-table/data-table.vue";

const users = useUsers();

function handleEdit(user: any) {
  console.log("Editar usuario:", user);
}

function handleDelete(user: any) {
  console.log("Eliminar usuario:", user);
}

const columns = useUsersTableColumns({
  onEdit: handleEdit,
  onDelete: handleDelete,
});

const emptyMessage = "No hay usuarios registrados";
</script>

<template>
  <ContentLayout title="Usuarios">
    <DataTable
      :data="users.data.value ?? []"
      :columns="columns"
      :loading="users.isLoading.value"
      :empty-message="emptyMessage"
    />
  </ContentLayout>
</template>
