<script setup lang="ts">
import UsersTable from "../components/users-table.vue";
import ContentLayout from "@/core/layout/content-layout.vue";
</script>

<template>
  <div>
    <ContentLayout title="Usuarios">
      <UsersTable />
    </ContentLayout>
  </div>
</template>
