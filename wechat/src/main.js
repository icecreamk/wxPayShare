import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Router from "./router";
import VueCookit from "vue-cookie";
import "./assets/css/base.css";
import "./assets/css/common.css";

Vue.use(VueAxios, axios);
Vue.use(VueCookit);
Vue.config.productionTip = false;

axios.interceptors.request.use(function(request) {
  return request;
});
axios.interceptors.response.use(
  function(response) {
    const res = response.data;
    if (resizeBy.code != 0) {
      alert(res.message);
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
