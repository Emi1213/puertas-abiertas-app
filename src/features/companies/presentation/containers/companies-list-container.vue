<script setup lang="ts">
import type { ICompany } from "../../interfaces/ICompany";
import CompaniesProvider from "../components/companies-provider.vue";
import CompaniesListView from "../views/companies-list-view.vue";

const handleEdit = (company: ICompany) => {
  console.log("Editar", company);
};

const handleDelete = (company: ICompany) => {
  console.log("Eliminar", company);
};
</script>

<template>
  <CompaniesProvider>
    <template #default="{ companies }">
      <CompaniesListView
        :companies="companies"
        :on-edit="handleEdit"
        :on-delete="handleDelete"
      />
    </template>
  </CompaniesProvider>
</template>
