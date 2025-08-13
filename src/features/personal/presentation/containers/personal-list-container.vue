<script setup lang="ts">
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import FormOverlay from "@/shared/components/form-overlay.vue";
import { usePersonalList } from "../../composables/use-personal-list";
import { usePersonalTable } from "../../composables/use-personal-table";
import { computed } from "vue";
import type { IPersonalListViewProps } from "../../interfaces/IPersonalListView";
import PersonalListView from "../views/personal-list-view.vue";
import PersonalForm from "../components/personal-form.vue";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  personalToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleSubmit,
  handleDelete,
  confirmDelete,
  cancelDelete,
} = usePersonalList();

const {
  personal,
  isLoading,
  searchQuery,
  statusFilter,
  empresaFilter,
  paginationProps,
  updateSearch,
  updateStatusFilter,
  updateEmpresaFilter,
  clearFilters,
} = usePersonalTable();

const personalListViewProps = computed(
  (): IPersonalListViewProps => ({
    personal: personal.value,
    loading: isLoading.value,
    searchQuery: searchQuery.value,
    statusFilter: statusFilter.value,
    empresaFilter: empresaFilter.value,
    paginationProps: paginationProps.value,
    onEdit: openEditDrawer,
    onDelete: handleDelete,
    onAdd: openAddDrawer,
    onUpdateSearch: updateSearch,
    onUpdateStatusFilter: updateStatusFilter,
    onUpdateEmpresaFilter: updateEmpresaFilter,
    onClearFilters: clearFilters,
  })
);
</script>
<template>
  <PersonalListView v-bind="personalListViewProps" />

  <FormOverlay
    :isOpen="drawerOpen"
    :onClose="closeDrawer"
    :title="initialData ? 'Editar Personal' : 'Agregar Personal'"
  >
    <PersonalForm
      :initial-data="initialData"
      :on-submit="handleSubmit"
      :on-cancel="closeDrawer"
    />
  </FormOverlay>

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar personal`"
    :message="`¿Estás seguro de que deseas eliminar a ${personalToDelete?.nombres} ${personalToDelete?.apellidos}?`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
