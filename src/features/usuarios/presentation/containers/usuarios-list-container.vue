<script setup lang="ts">
import type { IUsuario } from "../../interfaces/IUsuario";
import UsersProvider from "../components/users-provider.vue";
import UsersListView from "../views/usuarios-list-view.vue";

const handleEdit = (user: IUsuario) => {
  console.log("Editar", user);
};

const handleDelete = (user: IUsuario) => {
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
