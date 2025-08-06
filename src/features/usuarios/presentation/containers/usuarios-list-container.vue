<script setup lang="ts">
import { useUsuariosList } from "../../composables/use-usuarios-list";
import type { IUsuario } from "../../interfaces/IUsuario";
import UsersListView from "../views/usuarios-list-view.vue";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  usuarioToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleSubmit,
  handleDelete,
  confirmDelete,
  cancelDelete,
} = useUsuariosList();


</script>

<template>
  <FormOverlay
    :isOpen="drawerOpen"
    :onClose="closeDrawer"
    :title="initialData ? 'Editar Usuario' : 'Agregar Usuario'"
  >
    <UsuarioForm :onSubmit="handleSubmit" :initialData="initialData" />
  </FormOverlay>
  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar usuario`"
    :message="`¿Estás seguro de que quieres eliminar el usuario '${usuarioToDelete?.nombre}'? Esta acción no se puede deshacer.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
