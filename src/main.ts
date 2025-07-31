import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import "./index.css";
import { vueQueryClient } from "./core/infraestructure/vue-query/query-client.";

const toastOptions = {
  position: "top-right",
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(VueQueryPlugin, {
  queryClient: vueQueryClient,
});
app.use(router);
app.use(Toast, toastOptions);

app.mount("#app");
