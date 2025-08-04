<script setup lang="ts">
import type { IUser } from "../../interfaces/IUser";
import UsersProvider from "../components/users-provider.vue";
import UsersListView from "../views/users-list-view.vue";

const handleEdit = (user: IUser) => {
  console.log("Editar", user);
};

const handleDelete = (user: IUser) => {
  console.log("Eliminar", user);
};
</script>

<template>
  <UsersProvider>
    <template #default="{ users }">
      <UsersListView
        :users="users"
        :on-edit="handleEdit"
        :on-delete="handleDelete"
      />
    </template>
  </UsersProvider>
</template>
