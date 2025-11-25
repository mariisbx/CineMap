import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";
import "leaflet/dist/leaflet.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";


const app = createApp(App);

app.use(router).use(createPinia()).mount("#app");
