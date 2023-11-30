import { createApp } from "vue";
import { Dialog, Quasar } from "quasar";
import { createPinia } from "pinia";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";
import router from "./router";

import { i18n } from "./i18n";

const app = createApp(App).use(i18n);

app.use(Quasar, {
  plugins: {
    Dialog,
  }, // import Quasar plugins and add here
  config: {
    dark: (localStorage.getItem("prefers-color-scheme") as any) || "auto",
  },
});
app.use(createPinia());
app.use(router);

// Assumes you have a <div id="app"></div> in your index.html
app.mount("#app");
