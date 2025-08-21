import { ref, watch, type Ref } from "vue";

export function useDebounced<T>(source: Ref<T>, delay = 250) {
  const debounced = ref(source.value) as Ref<T>;
  let t: number | undefined;

  watch(
    source,
    (val) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        debounced.value = val as any;
      }, delay);
    },
    { immediate: true }
  );

  return debounced;
}
