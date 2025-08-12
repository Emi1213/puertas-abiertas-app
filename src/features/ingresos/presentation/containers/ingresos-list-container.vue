<script setup lang="ts">
import IngresosListView from "../views/ingresos-list-view.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { useIngresosList } from "../../composables/use-ingresos-list";
import { useIngresosTable } from "../../composables/use-ingresos-table";
import { computed } from "vue";
import type { IIngresosListViewProps } from "../../interfaces/IIngresosViewsProps";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  ingresoToRecognize,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleDelete,
  confirmDelete,
  cancelDelete,
  handleRecognize,
  confirmRecognize,
  cancelRecognize,
} = useIngresosList();

const {
  ingresos,
  isLoading,
  searchQuery,
  paginationProps,
  updateSearch,
  clearFilters,
} = useIngresosTable();

const ingresosListViewProps = computed(
  (): IIngresosListViewProps => ({
    ingresos: ingresos.value,
    loading: isLoading.value,
    searchQuery: searchQuery.value,
    paginationProps: paginationProps.value,
    onRecognize: handleRecognize,
    onEdit: openEditDrawer,
    onDelete: handleDelete,
    onAdd: openAddDrawer,
    onUpdateSearch: updateSearch,
    onClearFilters: clearFilters,
  })
);
</script>

<template>
  <IngresosListView v-bind="ingresosListViewProps" />

  <!-- TODO: Agregar FormOverlay e IngresoForm cuando sea necesario -->
  <!-- <FormOverlay
    :isOpen="drawerOpen"
    :onClose="closeDrawer"
    :title="initialData ? 'Editar Ingreso' : 'Agregar Ingreso'"
  >
    <IngresoForm :onSubmit="handleSubmit" :initialData="initialData" />
  </FormOverlay> -->

  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Reconocer ingreso`"
    :message="`¿Estás seguro de que quieres reconocer este ingreso? Esta acción no se puede deshacer.`"
    @confirm="confirmRecognize"
    @cancel="cancelRecognize"
  />
</template>
