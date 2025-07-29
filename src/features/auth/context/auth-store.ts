import { defineStore } from "pinia";
import { readLocalStorage } from "../../../core/helpers/read-local-storage";

interface IAuthStore {
  token: string;
}

const LC_KEY = "auth";
export const useAuthStore = defineStore(LC_KEY, {
  state: () =>
    ({
      token: "",
    } as IAuthStore),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.token = "";
    },
    loadData() {
      const store = readLocalStorage<IAuthStore>(LC_KEY);
      if (!store) return;
      this.token = store.token;
    },
  },
  persist: {
    key: LC_KEY,
    storage: localStorage,
  },
});
