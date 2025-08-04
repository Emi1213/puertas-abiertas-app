<script setup lang="ts">
import CompaniesProvider from "../components/companies-provider.vue";
import CompaniesListView from "../views/companies-list-view.vue";
import CompanyFormDrawer from "../components/company-form-drawer.vue";
import { useListCompanies } from "../../composables/use-list-companies";


const {
  drawerOpen,
  initialData,
  openAddDrawer,
  openEditDrawer,
  closeDrawer,
  handleSubmit,
} = useListCompanies();
</script>

<template>
  <CompaniesProvider>
    <template #default="{ companies }">
      <CompaniesListView
        :companies="companies"
        :on-edit="openEditDrawer"
        :on-delete="console.log"
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
</template>
