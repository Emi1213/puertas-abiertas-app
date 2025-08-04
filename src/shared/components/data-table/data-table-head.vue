<script setup lang="ts" generic="T extends BaseDataRow">
import type { BaseDataRow, Column } from "@/shared/interfaces/data-table.types";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

defineProps<{
  columns: Column<T>[];
}>();
</script>

<template>
  <TableHeader>
    <TableRow>
      <TableHead
        v-for="column in columns"
        :key="String(column.key)"
        :style="{ width: column.width ? column.width + 'px' : undefined }"
        :class="[
          'text-xs font-semibold uppercase',
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
