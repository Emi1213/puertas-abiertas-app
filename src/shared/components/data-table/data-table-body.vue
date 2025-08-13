<script setup lang="ts" generic="T extends BaseDataRow">
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import type {
  BaseDataRow,
  DataTableBodyProps,
} from "@/shared/interfaces/data-table.types";
import { isVNode } from "vue";

const props = defineProps<DataTableBodyProps<T>>();

function renderCell(
  column: (typeof props.columns)[number],
  row: T,
  index: number
) {
  if (column.render) {
    return column.render(row[column.key as keyof T], row, index);
  }
  return row[column.key as keyof T];
}
</script>

<template>
  <TableBody>
    <TableRow v-if="props.loading">
      <TableCell :colspan="props.columns.length" class="text-center py-6">
        <span
          class="inline-block w-6 h-6 border-4 border-slate-300 border-t-transparent rounded-full animate-spin"
        />
      </TableCell>
    </TableRow>

    <TableRow v-else-if="props.data.length === 0">
      <TableCell
        :colspan="props.columns.length"
        class="text-center py-6 text-slate-500"
      >
        {{ props.emptyMessage ?? "No hay registros" }}
      </TableCell>
    </TableRow>

    <TableRow
      v-for="(row, rowIndex) in props.data"
      :key="row.id"
      class="hover:bg-slate-50 transition"
      :class="{ 'cursor-pointer': !!props.onRowClick }"
      @click="props.onRowClick?.(row, rowIndex)"
    >
      <TableCell
        v-for="column in props.columns"
        :key="String(column.key)"
        :style="{ width: column.width ? column.width + 'px' : undefined }"
        :class="[
          'px-4 py-3 text-sm border-b border-gray-100',
          column.align === 'right'
            ? 'text-right'
            : column.align === 'center'
            ? 'text-center'
            : 'text-left',
        ]"
      >
        <template v-if="isVNode(renderCell(column, row, rowIndex))">
          <component :is="renderCell(column, row, rowIndex)" />
        </template>
        <template v-else>
          {{ renderCell(column, row, rowIndex) }}
        </template>
      </TableCell>
    </TableRow>
  </TableBody>
</template>
