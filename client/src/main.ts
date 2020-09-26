import Vue from 'vue';
import App from "./components/App.vue";
import "./styles/global.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
