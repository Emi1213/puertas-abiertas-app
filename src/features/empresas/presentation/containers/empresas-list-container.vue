<script setup lang="ts">
import EmpresasListView from "../views/empresas-list-view.vue";
import EmpresaFormDrawer from "../components/empresa-form-drawer.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { useEmpresasList } from "../../composables/use-empresas-list";
import { useEmpresasTable } from "../../composables/use-empresas-table";

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
</script>

<template>
  <EmpresasListView
    :empresas="empresas"
    :loading="isLoading"
    :search-query="searchQuery"
    :status-filter="statusFilter"
    :pagination-props="paginationProps"
    :on-edit="openEditDrawer"
    :on-delete="handleDelete"
    :on-add="openAddDrawer"
    :on-update-search="updateSearch"
    :on-update-status-filter="updateStatusFilter"
    :on-clear-filters="clearFilters"
  />

  <EmpresaFormDrawer
    :isOpen="drawerOpen"
    :onSubmit="handleSubmit"
    :onClose="closeDrawer"
    :initialData="initialData"
  />

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar empresa`"
    :message="`¿Estás seguro de que quieres eliminar la empresa '${empresaToDelete?.nombre}'? Esta acción no se puede deshacer.`"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
