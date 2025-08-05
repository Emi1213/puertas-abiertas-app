<script setup lang="ts">
import CompaniesProvider from "../components/empresas.vue";
import CompaniesListView from "../views/companies-list-view.vue";
import CompanyFormDrawer from "../components/empresa-form-drawer.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog.vue";
import { useEmpresasList } from "../../composables/use-empresas-list";

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
</script>

<template>
  <CompaniesProvider>
    <template #default="{ empresas: empresas }">
      <CompaniesListView
        :empresas="empresas"
        :on-edit="openEditDrawer"
        :on-delete="handleDelete"
        :on-add="openAddDrawer"
      />
    </template>
  </CompaniesProvider>

  <CompanyFormDrawer
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
