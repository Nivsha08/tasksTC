import Vue from 'vue';
import App from "./components/App.vue";
import "./styles/global.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle, faClock);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
