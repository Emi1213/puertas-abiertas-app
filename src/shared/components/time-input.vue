<script setup lang="ts">
import { computed } from "vue";

type DL = Date | null;

const props = defineProps<{
  modelValue: DL;
  minuteStep?: number;
  showSeconds?: boolean;
  disabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{ (e: "update:modelValue", v: DL): void }>();

const stepAttr = computed(() => {
  const minStep = Math.max(1, props.minuteStep ?? 5);
  return props.showSeconds ? 1 : minStep * 60;
});

const pad = (n: number) => String(n).padStart(2, "0");

const value = computed({
  get: () => {
    if (!props.modelValue) return "";
    const h = pad(props.modelValue.getHours());
    const m = pad(props.modelValue.getMinutes());
    const s = pad(props.modelValue.getSeconds());
    return props.showSeconds ? `${h}:${m}:${s}` : `${h}:${m}`;
  },
  set: (val: string) => {
    if (!val) return emit("update:modelValue", null);
    const parts = val.split(":").map(Number);
    const [h = 0, m = 0, s = 0] = parts;
    const base = props.modelValue ?? new Date();
    const next = new Date(base);
    next.setHours(h, m, props.showSeconds ? s : 0, 0);
    emit("update:modelValue", next);
  },
});
</script>

<template>
  <input
    :id="id"
    type="time"
    class="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
    :step="stepAttr"
    :disabled="disabled"
    v-model="value"
  />
</template>
