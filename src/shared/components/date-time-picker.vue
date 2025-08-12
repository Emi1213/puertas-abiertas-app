<script setup lang="ts">
import { computed, watch } from "vue";
import DateInput from "./date-input.vue";
import TimeInput from "./time-input.vue";

type DL = Date | null;

const props = defineProps<{
  modelValue: DL;
  min?: Date;
  max?: Date;
  minuteStep?: number;
  showSeconds?: boolean;
  disabled?: boolean;
  label?: string;
  showPreview?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: DL): void;
  (e: "change", v: DL): void;
}>();

const value = computed<DL>({
  get: () => (props.modelValue ? new Date(props.modelValue) : null),
  set: (v) => {
    emit("update:modelValue", v ? new Date(v) : null);
    emit("change", v ? new Date(v) : null);
  },
});

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return;
    if (props.min && v < props.min) value.value = new Date(props.min);
    else if (props.max && v > props.max) value.value = new Date(props.max);
  },
  { immediate: true }
);

const previewText = computed(() => {
  if (!value.value) return "";
  const d = value.value;
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: props.showSeconds ? "2-digit" : undefined,
  });
  return `${date} ${time}`;
});
</script>

<template>
  <div class="space-y-3">
    <div v-if="label">
      <label class="block text-sm font-medium text-slate-700">{{
        label
      }}</label>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <DateInput
        :model-value="value"
        :min="min"
        :max="max"
        :disabled="disabled"
        placeholder="Selecciona fecha"
        @update:modelValue="value = $event"
      />
      <TimeInput
        :model-value="value"
        :minute-step="minuteStep"
        :show-seconds="showSeconds"
        :disabled="disabled || !value"
        @update:modelValue="value = $event"
      />
    </div>

    <div v-if="showPreview" class="space-y-1">
      <label class="block text-xs text-slate-500"
        >Fecha y hora seleccionadas</label
      >
      <input
        class="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm bg-slate-50"
        :value="previewText"
        readonly
      />
    </div>
  </div>
</template>
