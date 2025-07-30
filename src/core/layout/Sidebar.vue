<template>
  <aside
    class="w-64 h-full bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col shadow-xl border-r border-slate-200/80"
  >
    <div class="p-6 border-b border-slate-200/60">
      <div class="flex items-center gap-3">
        <div>
          <h1 class="text-lg font-bold text-slate-800">Control Ingresos</h1>
          <p class="text-xs text-slate-500">Gestión de accesos</p>
        </div>
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-6">
      <div>
        <h3
          class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3"
        >
          Principal
        </h3>
        <div class="space-y-1">
          <RouterLink
            to="/companies"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
            active-class="bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100"
          >
            <Building2
              class="w-4 h-4 text-slate-500 group-hover:text-slate-700"
            />
            <span class="text-sm text-slate-700 group-hover:text-slate-900">
              Empresas
            </span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Building2 } from "lucide-vue-next";
</script>
