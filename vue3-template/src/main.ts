import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/routes";
import 'element-plus/dist/index.css'

const app = createApp(App);

const pinia = createPinia();
app.use(pinia).use(router);
app.mount("#app");
