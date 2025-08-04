<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import type { ICompany } from "../../interfaces/ICompany";
import { useCompaniesTableColumns } from "../components/companies-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";

const { companies, loading, onEdit, onDelete } = defineProps<{
  companies: ICompany[];
  loading?: boolean;
  onEdit?: (company: ICompany) => void;
  onDelete?: (company: ICompany) => void;
}>();

const columns = useCompaniesTableColumns({ onEdit, onDelete });
const emptyMessage = "No hay empresas registradas";
</script>

<template>
  <ContentLayout title="Empresas">
    <div class="space-y-6">
      <div class="flex items-center justify-end">
        <!-- <div class="flex justify-end" v-if="!isEmployee"> -->
        <Button class="bg-blue-700 text-white"
          ><Plus class="w-4 h-4" /> Agregar
        </Button>
        <!-- </div> -->
      </div>
      <div class="rounded-md bg-white px-6 py-4">
        <DataTable
          :data="companies"
          :columns="columns"
          :loading="loading"
          :empty-message="emptyMessage"
        />
      </div>
    </div>
  </ContentLayout>
</template>
