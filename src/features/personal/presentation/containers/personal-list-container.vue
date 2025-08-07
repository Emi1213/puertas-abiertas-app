<script setup lang="ts">
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { usePersonalList } from "../../composables/use-personal-list";
import { usePersonalTable } from "../../composables/use-personal-table";
import { computed } from "vue";
import type { IPersonalListViewProps } from "../../interfaces/IPersonalListView";

const {
  drawerOpen,
  initialData,
  confirmDialogOpen,
  personalToDelete,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  //   handleSubmit,
  handleDelete,
  //   confirmDelete,
  cancelDelete,
} = usePersonalList();

const {
  personal,
  isLoading,
  searchQuery,
  statusFilter,
  paginationProps,
  updateSearch,
  updateStatusFilter,
  clearFilters,
} = usePersonalTable();

const personalListViewProps = () =>
  computed(
    (): IPersonalListViewProps => ({
      personal: personal.value,
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
  <ConfirmationDialog
    :visible="confirmDialogOpen"
    :title="`Eliminar personal`"
    :message="`¿Estás seguro de que deseas eliminar a ${personalToDelete?.nombres} ${personalToDelete?.apellidos}?`"
    @confirm=""
    @cancel="cancelDelete"
  />
</template>
