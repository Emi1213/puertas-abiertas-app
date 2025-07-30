<template>
  <div class="dashboard-layout">
    <Sidebar />

    <div class="dashboard-main">
      <Header />

      <div class="dashboard-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue' 
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f9fafb;
}
</style>
