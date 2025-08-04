<script setup lang="ts">
import { RouterView } from "vue-router";

import EnvironmentIdentifier from "./components/environment-identifier.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <RouterView />
  <EnvironmentIdentifier />
  <VueQueryDevtools />
</template>
