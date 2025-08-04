<script setup lang="ts" generic="T extends BaseDataRow">
import { Table } from "@/components/ui/table";
import DataTableHead from "./data-table-head.vue";
import DataTableBody from "./data-table-body.vue";

import type { BaseDataRow, DataTableProps} from "@/shared/interfaces/data-table.types";

const props = defineProps<DataTableProps<T>>();
</script>

<template>
  <div
    class="rounded-md border border-slate-200 overflow-hidden bg-white shadow-sm"
  >
    <Table>
      <DataTableHead :columns="props.columns" />
      <DataTableBody
        :data="props.data"
        :columns="props.columns"
        :loading="props.loading ?? false"
        :empty-message="props.emptyMessage"
        :on-row-click="props.onRowClick"
      />

      <!-- Pagination (⚠️ opcional - no implementado aún) -->
      <!--
      <DataTablePagination
        v-if="props.pagination"
        :col-span="props.columns.length"
        :count="props.data.length"
        ...
      />
      -->
    </Table>
  </div>
</template>
