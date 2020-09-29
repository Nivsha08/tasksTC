import Vue from 'vue';
import App from "./components/App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/global.scss";
import { BootstrapVue } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faClock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {store} from "@/store/store";

library.add(faCheckCircle, faClock, faSpinner);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
