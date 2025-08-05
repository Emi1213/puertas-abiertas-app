<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 p-4 overflow-y-auto bg-gray-50">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./sidebar.vue";
</script>
