<script setup lang="ts">
import PerfilesListView from "./views/perfiles-list-view.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { usePerfilesList } from "../composables/use-perfiles-list";
import { usePerfilesTable } from "../composables/use-perfiles-table";
import FormOverlay from "@/shared/components/form-overlay.vue";
import PerfilForm from "./components/perfil-form.vue";
import { computed } from "vue";
import type { IPerfilesListViewProps } from "../interfaces/IPerfilesListView";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  perfilToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleSubmit,
  handleDelete,
  confirmDelete,
  cancelDelete,
} = usePerfilesList();

const {
  perfiles,
  isLoading,
  searchQuery,
  paginationProps,
  updateSearch,
  clearFilters,
} = usePerfilesTable();

const perfilesListViewProps = computed(
  (): IPerfilesListViewProps => ({
    perfiles: perfiles.value,
    loading: isLoading.value,
    searchQuery: searchQuery.value,
    paginationProps: paginationProps.value,
    onEdit: openEditDrawer,
    onDelete: handleDelete,
    onAdd: openAddDrawer,
    onUpdateSearch: updateSearch,
    onClearFilters: clearFilters,
  })
);
</script>

<template>
  <PerfilesListView v-bind="perfilesListViewProps" />

  <FormOverlay
    :isOpen="drawerOpen"
    :onClose="closeDrawer"
    :title="initialData ? 'Editar Perfil' : 'Agregar Perfil'"
  >
    <PerfilForm
      :onSubmit="handleSubmit"
      :onCancel="closeDrawer"
      :initialData="initialData"
    />
  </FormOverlay>

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar perfil`"
    :message="`¿Estás seguro de que quieres eliminar el perfil '${perfilToDelete?.nombre}'? Esta acción no se puede deshacer.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
