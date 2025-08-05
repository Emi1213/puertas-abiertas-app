<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TableFooter, TableRow } from "@/components/ui/table";
import { computed } from "vue";

const props = defineProps<{
  colSpan: number;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const pages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => ({
    type: "page",
    value: i + 1,
  }))
);
</script>

<template>
  <TableFooter>
    <TableRow>
      <td :colspan="props.colSpan" class="px-4 py-3">
        <div class="flex items-center justify-center">
          <Pagination
            :items-per-page="props.pageSize"
            :total="props.total"
            :default-page="props.page + 1"
            v-slot="{ page }"
          >
            <PaginationContent>
              <PaginationPrevious
                @click="
                  () => props.page > 0 && props.onPageChange(props.page - 1)
                "
              />
              <template v-for="item in pages" :key="item.value">
                <PaginationItem
                  :value="item.value"
                  :is-active="item.value === page"
                  @click="() => props.onPageChange(item.value - 1)"
                >
                  {{ item.value }}
                </PaginationItem>
              </template>

              <PaginationEllipsis v-if="totalPages > 5" :index="4" />

              <PaginationNext
                @click="
                  () =>
                    props.page < totalPages - 1 &&
                    props.onPageChange(props.page + 1)
                "
              />
            </PaginationContent>
          </Pagination>
        </div>
      </td>
    </TableRow>
  </TableFooter>
</template>
