import { defineStore } from "pinia";
import { readLocalStorage } from "../../../core/helpers/read-local-storage";
import type { ICuenta } from "../interfaces/ICuenta";

interface IAuthStore {
  token: string;
  usuario: ICuenta | null;
}

const LC_KEY = "auth";
export const useAuthStore = defineStore(LC_KEY, {
  state: () =>
    ({
      usuario: null as ICuenta | null,
      token: "",
    } as IAuthStore),
  actions: {
    setUser(userData: ICuenta) {
      this.usuario = userData;
    },
    setToken(token: string) {
      this.token = token;
    },

    logout() {
      this.usuario = null;
      this.token = "";
    },
    loadData() {
      const store = readLocalStorage<IAuthStore>(LC_KEY);
      if (!store) return;
      this.token = store.token;
      this.usuario = store.usuario;
    },
    getUser() {
      this.loadData();
      return this.usuario;
    },
  },
  persist: {
    key: LC_KEY,
    storage: localStorage,
  },
});
