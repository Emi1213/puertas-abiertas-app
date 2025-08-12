<script setup lang="ts">
import { computed } from "vue";
import { useIngresoForm } from "../../composables/use-ingreso-form";
import type { IIngresosFormViewProps } from "../../interfaces/IIngresosFormView";
import IngresosFormView from "../views/ingresos-form-view.vue";

const { initialData, isEditing, handleSubmit, handleCancel } = useIngresoForm();

const ingresosFormViewProps = computed(
  (): IIngresosFormViewProps => ({
    initialData: initialData.value,
    isEditing: isEditing.value,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  })
);
</script>

<template>
  <IngresosFormView v-bind="ingresosFormViewProps" />
</template>
