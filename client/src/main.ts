import Vue from 'vue';
import App from "./components/App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/global.scss";
import { BootstrapVue } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle, faClock);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
