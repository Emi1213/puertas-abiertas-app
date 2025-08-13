<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Clock, X, Check, ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";

type DL = Date | null;

const props = defineProps<{
  modelValue: DL;
  min?: Date;
  max?: Date;
  minuteStep?: number;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  invalid?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: DL): void;
  (e: "change", v: DL): void;
}>();

const tz = getLocalTimeZone();
const toDV = (d?: Date | null): DateValue | undefined =>
  d ? fromDate(d, tz) : undefined;
const toJS = (dv?: DateValue): DL =>
  dv
    ? new Date(
        (dv as any).year,
        (dv as any).month - 1,
        (dv as any).day,
        "hour" in (dv as any) ? (dv as any).hour : 0,
        "minute" in (dv as any) ? (dv as any).minute : 0,
        0,
        0
      )
    : null;

const open = ref(false);
const working = ref<DL>(props.modelValue ? new Date(props.modelValue) : null);

watch(
  () => props.modelValue,
  (v) => (working.value = v ? new Date(v) : null),
  { immediate: true }
);

const minDV = computed(() => toDV(props.min));
const maxDV = computed(() => toDV(props.max));

const calendarValue = computed<DateValue | undefined>({
  get: () => toDV(working.value),
  set: (dv) => {
    const picked = toJS(dv);
    if (!picked) {
      working.value = null;
      return;
    }
    if (working.value)
      picked.setHours(
        working.value.getHours(),
        working.value.getMinutes(),
        0,
        0
      );
    working.value = picked;
  },
});

const step = computed(() => Math.max(1, props.minuteStep ?? 1));
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = computed(() =>
  Array.from({ length: Math.ceil(60 / step.value) }, (_, i) => i * step.value)
);
const hour = computed(() => (working.value ? working.value.getHours() : 0));
const minute = computed(() => (working.value ? working.value.getMinutes() : 0));

function setTime(h: number, m: number) {
  const base = working.value ?? new Date();
  const next = new Date(base);
  next.setHours(h, m, 0, 0);
  working.value = next;
}

function clearAll() {
  working.value = null;
}

function apply() {
  if (working.value && props.min && working.value < props.min)
    working.value = new Date(props.min);
  if (working.value && props.max && working.value > props.max)
    working.value = new Date(props.max);
  emit("update:modelValue", working.value ? new Date(working.value) : null);
  emit("change", working.value ? new Date(working.value) : null);
  open.value = false;
}

const hourListRef = ref<HTMLElement | null>(null);
const minuteListRef = ref<HTMLElement | null>(null);

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  const hEl = hourListRef.value?.querySelector(
    `[data-val='${hour.value}']`
  ) as HTMLElement | null;
  const mEl = minuteListRef.value?.querySelector(
    `[data-val='${minute.value}']`
  ) as HTMLElement | null;
  hEl?.scrollIntoView({ block: "center" });
  mEl?.scrollIntoView({ block: "center" });
});
</script>

<template>
  <div class="space-y-2">
    <Label v-if="label" class="text-sm font-medium text-gray-700">{{
      label
    }}</Label>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          class="w-full justify-between h-9 px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 rounded-md text-left font-normal transition-colors"
          :class="
            cn(
              !modelValue && 'text-muted-foreground',
              invalid && 'border-red-400 bg-red-50',
              'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
            )
          "
          :disabled="disabled"
        >
          <span class="inline-flex items-center gap-2 min-w-0">
            <CalendarDays class="size-4 text-blue-600 shrink-0" />
            <span class="text-sm text-gray-900 truncate">
              {{
                modelValue
                  ? `${modelValue.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })} ${modelValue.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : placeholder ?? "Selecciona fecha y hora"
              }}
            </span>
          </span>
          <ChevronDown
            class="size-4 shrink-0 text-gray-400 transition-transform"
            :class="{ 'rotate-180': open }"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        class="w-[500px] p-0 rounded-md shadow-md border bg-white"
        align="start"
      >
        <div class="p-3 space-y-3">
          <div class="grid grid-cols-[1fr_180px] gap-3">
            <!-- Calendario -->
            <div class="border rounded-md">
              <Calendar
                v-model="calendarValue"
                mode="single"
                :minValue="minDV"
                :maxValue="maxDV"
                initial-focus
                class="rounded-md"
              />
            </div>

            <!-- Selectores de tiempo -->
            <div class="border rounded-md p-2">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-600">
                <Clock class="size-3" />
                <span>Hora</span>
                <span v-if="working" class="ml-auto font-mono text-blue-600">
                  {{
                    working.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <!-- Horas -->
                <div>
                  <div class="text-xs text-gray-500 mb-1">Horas</div>
                  <ScrollArea class="h-48 border rounded">
                    <div class="p-1">
                      <button
                        v-for="h in hours"
                        :key="h"
                        :data-val="h"
                        class="w-full px-2 py-0.5 rounded text-xs tabular-nums transition-colors hover:bg-blue-50"
                        :class="
                          h === hour
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700'
                        "
                        @click="setTime(h, minute)"
                      >
                        {{ String(h).padStart(2, "0") }}
                      </button>
                    </div>
                  </ScrollArea>
                </div>

                <!-- Minutos -->
                <div>
                  <div class="text-xs text-gray-500 mb-1">Min</div>
                  <ScrollArea class="h-48 border rounded">
                    <div class="p-1">
                      <button
                        v-for="m in minutes"
                        :key="m"
                        :data-val="m"
                        class="w-full px-2 py-0.5 rounded text-xs tabular-nums transition-colors hover:bg-green-50"
                        :class="
                          m === minute
                            ? 'bg-green-500 text-white'
                            : 'text-gray-700'
                        "
                        @click="setTime(hour, m)"
                      >
                        {{ String(m).padStart(2, "0") }}
                      </button>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              @click="clearAll"
              class="text-red-600 hover:bg-red-50 text-xs px-2 py-1 h-7"
            >
              <X class="size-3 mr-1" /> Limpiar
            </Button>

            <div class="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                @click="open = false"
                class="px-3 py-1 text-xs h-7"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                @click="apply"
                class="px-3 py-1 text-xs h-7 bg-blue-600 hover:bg-blue-700"
              >
                <Check class="size-3 mr-1" /> OK
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
