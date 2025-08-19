import type { IModulo } from "@/features/modulos/interfaces/IModulo";
import { defineStore } from "pinia";

export const useRbacStore = defineStore("rbac", {
  state: () => ({
    perfilId: 0,
    rbacVersion: 0,
    modules: [] as IModulo[],
  }),
  getters: {
    allowedKeys: (s) => s.modules.map((m) => m.alias),
  },
  actions: {
    setNavigation(perfilId: number, rbacVersion: number, modules: IModulo[]) {
      this.perfilId = perfilId;
      this.rbacVersion = rbacVersion;
      this.modules = modules;
    },
    clear() {
      this.perfilId = 0;
      this.rbacVersion = 0;
      this.modules = [];
    },
  },
  persist: false,
});
