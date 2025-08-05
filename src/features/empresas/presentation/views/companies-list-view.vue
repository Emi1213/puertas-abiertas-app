<script setup lang="ts">
import ContentLayout from "@/core/layout/content-layout.vue";
import DataTable from "@/shared/components/data-table/data-table.vue";
import type { IEmpresa } from "../../interfaces/IEmpresa";
import { useEmpresasTableColumns } from "../components/empresas-table-columns";
import Button from "@/components/ui/button/Button.vue";
import { Plus } from "lucide-vue-next";

const {
  empresas: empresas,
  loading,
  onEdit,
  onDelete,
  onAdd,
} = defineProps<{
  empresas: IEmpresa[];
  loading?: boolean;
  onEdit?: (empresa: IEmpresa) => void;
  onDelete?: (empresa: IEmpresa) => void;
  onAdd?: () => void;
}>();

const columns = useEmpresasTableColumns({ onEdit, onDelete });
const emptyMessage = "No hay empresas registradas";
</script>

<template>
  <ContentLayout title="Empresas">
    <div class="space-y-6">
      <div class="flex items-center justify-end">
        <Button @click="onAdd"> <Plus class="w-4 h-4" /> Agregar </Button>
      </div>
      <div class="rounded-md bg-white px-6 py-4">
        <DataTable
          :data="empresas"
          :columns="columns"
          :loading="loading"
          :empty-message="emptyMessage"
        />
      </div>
    </div>
  </ContentLayout>
</template>
