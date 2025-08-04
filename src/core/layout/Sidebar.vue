<!-- src/shared/components/sidebar/sidebar.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarMenu } from "./sidebar-menu-data";
import { useAuthStore } from "../../features/auth/context/auth-store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isCollapsed = ref(false);

const userRole = authStore.user?.role || "";

const visibleMenu = sidebarMenu
  .map((section) => {
    const visibleItems = section.items.filter(
      (item) => !item.roles || item.roles.includes(userRole)
    );
    return { ...section, items: visibleItems };
  })
  .filter((section) => section.items.length > 0);

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <TooltipProvider>
    <aside
      :class="[
        'h-full bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col shadow-xl border-r border-slate-200/80 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="p-6 border-b border-slate-200/60 relative">
        <div class="flex items-center justify-between">
          <div v-if="!isCollapsed" class="flex items-center gap-3">
            <div>
              <h1 class="text-lg font-bold text-slate-800">Control Ingresos</h1>
              <p class="text-xs text-slate-500">Gestión de accesos</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="toggleSidebar"
            class="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md z-10"
          >
            <ChevronLeft v-if="!isCollapsed" class="w-3 h-3" />
            <ChevronRight v-if="isCollapsed" class="w-3 h-3" />
          </Button>
        </div>
      </div>
      <nav
        class="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-6"
      >
        <div class="space-y-6">
          <div v-for="section in visibleMenu" :key="section.title">
            <!-- Section title - solo visible cuando no está colapsado -->
            <h3
              v-if="!isCollapsed"
              class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3"
            >
              {{ section.title }}
            </h3>
            <div
              v-if="isCollapsed"
              class="border-t border-slate-200/60 mb-3"
            ></div>
            <div class="space-y-1">
              <template v-for="item in section.items" :key="item.to">
                <!-- Con tooltip cuando está colapsado -->
                <Tooltip v-if="isCollapsed" :delay-duration="0">
                  <TooltipTrigger as-child>
                    <RouterLink
                      :to="item.to"
                      class="flex items-center justify-center p-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
                      :class="{
                        'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100':
                          route.path === item.to,
                      }"
                    >
                      <component
                        :is="item.icon"
                        class="w-4 h-4 text-slate-500 group-hover:text-slate-700"
                        :class="{
                          'text-blue-700': route.path === item.to,
                        }"
                      />
                    </RouterLink>
                  </TooltipTrigger>
                  <TooltipContent side="right" class="ml-2">
                    <p>{{ item.label }}</p>
                  </TooltipContent>
                </Tooltip>
                <RouterLink
                  v-else
                  :to="item.to"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
                  :class="{
                    'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100':
                      route.path === item.to,
                  }"
                >
                  <component
                    :is="item.icon"
                    class="w-4 h-4 text-slate-500 group-hover:text-slate-700"
                    :class="{
                      'text-blue-700': route.path === item.to,
                    }"
                  />
                  <span
                    class="text-sm text-slate-700 group-hover:text-slate-900"
                  >
                    {{ item.label }}
                  </span>
                </RouterLink>
              </template>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t border-slate-200/60">
          <Tooltip v-if="isCollapsed" :delay-duration="0">
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="sm"
                @click="logout"
                class="w-full flex items-center justify-center p-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut class="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" class="ml-2">
              <p>Cerrar sesión</p>
            </TooltipContent>
          </Tooltip>
          <Button
            v-else
            variant="ghost"
            @click="logout"
            class="w-full flex items-center gap-2 justify-start text-sm text-slate-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut class="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </nav>
    </aside>
  </TooltipProvider>
</template>
