<script setup lang="ts">
import { computed } from "vue";

type DL = Date | null;

const props = defineProps<{
  modelValue: DL;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
}>();

const emit = defineEmits<{ (e: "update:modelValue", v: DL): void }>();

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const value = computed({
  get: () => (props.modelValue ? fmt(props.modelValue) : ""),
  set: (val: string) => {
    if (!val) return emit("update:modelValue", null);
    const [y, m, dd] = val.split("-").map(Number);
    const base = props.modelValue ?? new Date();
    const next = new Date(base);
    next.setFullYear(y, m - 1, dd);
    emit("update:modelValue", next);
  },
});

const minStr = computed(() => (props.min ? fmt(props.min) : undefined));
const maxStr = computed(() => (props.max ? fmt(props.max) : undefined));
</script>

<template>
  <input
    :id="id"
    type="date"
    class="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
    :min="minStr"
    :max="maxStr"
    :placeholder="placeholder || 'YYYY-MM-DD'"
    :disabled="disabled"
    v-model="value"
  />
</template>
