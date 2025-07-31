import { defineStore } from "pinia";
import { readLocalStorage } from "../../../core/helpers/read-local-storage";
import type { IAccount } from "../interfaces/IAccount";

interface IAuthStore {
  token: string;
  user: IAccount | null;
}

const LC_KEY = "auth";
export const useAuthStore = defineStore(LC_KEY, {
  state: () =>
    ({
      user: null as IAccount | null,
      token: "",
    } as IAuthStore),
  actions: {
    setUser(userData: IAccount) {
      this.user = userData;
    },
    setToken(token: string) {
      this.token = token;
    },

    logout() {
      this.user = null;
      this.token = "";
    },
    loadData() {
      const store = readLocalStorage<IAuthStore>(LC_KEY);
      if (!store) return;
      this.token = store.token;
      this.user = store.user;
    },
    getUser() {
      this.loadData();
      return this.user;
    },
  },
  persist: {
    key: LC_KEY,
    storage: localStorage,
  },
});
