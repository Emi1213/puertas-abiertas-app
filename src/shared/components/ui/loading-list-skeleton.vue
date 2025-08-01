<script setup lang="ts"></script>

<template>
  <div class="space-y-2 animate-pulse">
    <div
      v-for="i in 5"
      :key="i"
      class="flex items-center gap-4 px-4 py-3 bg-white rounded-md shadow border border-slate-200"
    >
      <div class="w-6 h-6 bg-slate-200 rounded-full"></div>
      <div class="flex-1">
        <div class="h-3 w-3/4 bg-slate-200 rounded mb-1"></div>
        <div class="h-3 w-1/2 bg-slate-200 rounded"></div>
      </div>
      <div class="w-16 h-3 bg-slate-200 rounded"></div>
    </div>
  </div>
</template>
