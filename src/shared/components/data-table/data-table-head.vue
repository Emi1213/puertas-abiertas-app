<script setup lang="ts" generic="T extends BaseDataRow">
import type { BaseDataRow, Column } from "@/shared/interfaces/data-table.types";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

defineProps<{
  columns: Column<T>[];
}>();
</script>

<template>
  <TableHeader>
    <TableRow class="bg-indigo-950 border-gray-200 hover:bg-indigo-950">
      <TableHead
        v-for="column in columns"
        :key="String(column.key)"
        :style="{ width: column.width ? column.width + 'px' : undefined }"
        :class="[
          'text-sm font-semibold text-white pl-5 hover:text-white hover:bg-indigo-950',
          column.align === 'right'
            ? 'text-right'
            : column.align === 'center'
            ? 'text-center'
            : 'text-left',
        ]"
      >
        {{ column.label }}
      </TableHead>
    </TableRow>
  </TableHeader>
</template>
