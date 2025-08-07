<script setup lang="ts">
import EmpresasListView from "../views/empresas-list-view.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { useEmpresasList } from "../../composables/use-empresas-list";
import { useEmpresasTable } from "../../composables/use-empresas-table";
import FormOverlay from "@/shared/components/form-overlay.vue";
import EmpresaForm from "../components/empresa-form.vue";
import { computed } from "vue";
import type { IEmpresasListViewProps } from "../../interfaces/IEmpresasListView";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  empresaToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleSubmit,
  handleDelete,
  confirmDelete,
  cancelDelete,
} = useEmpresasList();

const {
  empresas,
  isLoading,
  searchQuery,
  statusFilter,
  paginationProps,
  updateSearch,
  updateStatusFilter,
  clearFilters,
} = useEmpresasTable();

const empresasListViewProps = computed(
  (): IEmpresasListViewProps => ({
    empresas: empresas.value,
    loading: isLoading.value,
    searchQuery: searchQuery.value,
    statusFilter: statusFilter.value,
    paginationProps: paginationProps.value,
    onEdit: openEditDrawer,
    onDelete: handleDelete,
    onAdd: openAddDrawer,
    onUpdateSearch: updateSearch,
    onUpdateStatusFilter: updateStatusFilter,
    onClearFilters: clearFilters,
  })
);
</script>

<template>
  <EmpresasListView v-bind="empresasListViewProps" />

  <FormOverlay
    :isOpen="drawerOpen"
    :onClose="closeDrawer"
    :title="initialData ? 'Editar Empresa' : 'Agregar Empresa'"
  >
    <EmpresaForm :onSubmit="handleSubmit" :initialData="initialData" />
  </FormOverlay>

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar empresa`"
    :message="`¿Estás seguro de que quieres eliminar la empresa '${empresaToDelete?.nombre}'? Esta acción no se puede deshacer.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
