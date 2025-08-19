<script setup lang="ts">
import { computed } from "vue";
import { useUsuariosList } from "../../composables/use-usuarios-list";
import { useUsuariosTable } from "../../composables/use-usuarios-table";
import UsersListView from "../views/usuarios-list-view.vue";
import type { IUsuariosListViewProps } from "../../interfaces/IUsuariosListView";
import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";
import FormOverlay from "@/shared/components/form-overlay.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import UsuarioForm from "../components/usuario-form.vue";
import PerfilesProvider from "@/features/perfiles/presentation/components/perfiles-provider.vue";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  usuarioToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleDelete,
  confirmDelete,
  cancelDelete,
  handleSubmit,
} = useUsuariosList();

const {
  usuarios,
  isLoading,
  searchQuery,
  profileFilter,
  paginationProps,
  updateSearch,
  updateProfileFilter,
  clearFilters,
} = useUsuariosTable();

const usuariosListViewProps = (perfiles: IPerfil[]) =>
  computed(
    (): IUsuariosListViewProps => ({
      usuarios: usuarios.value,
      loading: isLoading.value,
      searchQuery: searchQuery.value,
      profileFilter: profileFilter.value,
      perfiles: perfiles,
      paginationProps: paginationProps.value,
      onEdit: openEditDrawer,
      onDelete: handleDelete,
      onAdd: openAddDrawer,
      onUpdateSearch: updateSearch,
      onUpdateProfileFilter: updateProfileFilter,
      onClearFilters: clearFilters,
    })
  );
</script>

<template>
  <PerfilesProvider v-slot="{ perfiles }">
    <UsersListView v-bind="usuariosListViewProps(perfiles).value" />

    <FormOverlay
      :isOpen="drawerOpen"
      :onClose="closeDrawer"
      :title="initialData ? 'Editar Usuario' : 'Agregar Usuario'"
    >
      <UsuarioForm
        :initial-data="initialData"
        :perfiles="perfiles"
        :on-submit="handleSubmit"
        :on-cancel="closeDrawer"
      />
    </FormOverlay>
  </PerfilesProvider>

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar usuario`"
    :message="`¿Estás seguro de que quieres eliminar el usuario '${usuarioToDelete?.nombre}'? Esta acción no se puede deshacer.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
