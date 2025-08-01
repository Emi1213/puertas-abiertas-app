<script setup lang="ts" generic="T extends BaseDataRow">
import type { BaseDataRow, Column } from "@/shared/interfaces/data-table.types";

defineProps<{
  columns: Column<T>[];
}>();
</script>

<template>
  <thead class="bg-slate-100">
    <tr>
      <th
        v-for="column in columns"
        :key="String(column.key)"
        :style="{ width: column.width + 'px' }"
        :class="[
          'px-4 py-2 text-xs font-semibold text-slate-600 uppercase',
          column.align === 'right'
            ? 'text-right'
            : column.align === 'center'
            ? 'text-center'
            : 'text-left',
        ]"
      >
        {{ column.label }}
      </th>
    </tr>
  </thead>
</template>
