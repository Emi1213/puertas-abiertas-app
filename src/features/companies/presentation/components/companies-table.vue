<script setup lang="ts">
import { Grid } from "@progress/kendo-vue-grid";
import type { ICompany } from "../../interfaces/company.interface";

defineProps<{
  companies: ICompany[];
}>();
</script>

<template>
  <Grid :data-items="companies" :style="{ height: '500px' }">
    <column field="id" title="ID" width="80" />
    <column field="nombre" title="Nombre" />
    <column field="ruc" title="RUC" />
    <column field="direccion" title="Dirección" />
    <column field="telefono" title="Teléfono" />
    <column field="correo" title="Correo" />
    <column field="estado" title="Estado">
      <template #cell="{ dataItem }">
        <span :class="dataItem.estado ? 'text-green-600' : 'text-red-600'">
          {{ dataItem.estado ? "Activo" : "Inactivo" }}
        </span>
      </template>
    </column>
  </Grid>
</template>
