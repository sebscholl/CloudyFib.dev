import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

/* Plugins */
import "./plugins/donut";
import vuetify from "./plugins/vuetify";
import apolloProvider from "./plugins/apollo";

/* Components */
Vue.component("cloudy-btn", require("./components/CloudyButton.vue").default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
