<script setup lang="ts">
import IngresosListView from "../views/ingresos-list-view.vue";
import AlarmasDrawer from "../components/alarmas-drawer.vue";
import DetallesDrawer from "../components/detalles-drawer.vue";
import { useIngresosList } from "../../composables/use-ingresos-list";
import { useIngresosTable } from "../../composables/use-ingresos-table";
import { computed } from "vue";
import type { IIngresosListViewProps } from "../../interfaces/IIngresosListView";

const {
  detallesDrawerOpen,
  alarmasDrawerOpen,
  currentIngreso,
  openAddDrawer,
  openViewDetails,
  closeDetallesDrawer,
  openEditDrawer,
  openAlarmasDrawer,
  closeAlarmasDrawer,
} = useIngresosList();

const {
  ingresos,
  isLoading,
  searchQuery,
  statusFilter,
  paginationProps,
  updateSearch,
  updateStatusFilter,
  clearFilters,
} = useIngresosTable();

const ingresosListViewProps = computed(
  (): IIngresosListViewProps => ({
    ingresos: ingresos.value,
    loading: isLoading.value,
    searchQuery: searchQuery.value,
    statusFilter: statusFilter.value,
    paginationProps: paginationProps.value,
    onEdit: openEditDrawer,
    onViewDetails: openViewDetails,
    onViewAlarmas: openAlarmasDrawer,
    onAdd: openAddDrawer,
    onUpdateSearch: updateSearch,
    onUpdateStatusFilter: updateStatusFilter,
    onClearFilters: clearFilters,
  })
);
</script>

<template>
  <IngresosListView v-bind="ingresosListViewProps" />

  <DetallesDrawer
    :isOpen="detallesDrawerOpen"
    :ingreso="currentIngreso"
    :onClose="closeDetallesDrawer"
  />

  <AlarmasDrawer
    :isOpen="alarmasDrawerOpen"
    :ingreso="currentIngreso"
    :onClose="closeAlarmasDrawer"
  />
</template>
