import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Router from "./router";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

axios.interceptors.request.use(function() {});
axios.interceptors.response.use(
  function(response) {
    const res = response.data;
    if (resizeBy.code != 0) {
      alert(res.message);
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
