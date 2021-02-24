import Vue from "vue";
import Router from "vue-router";
import Index from "../pages/index";
import Activity from "../pages/activity";
import Pay from "../pages/pay";

Vue.use(Router);

const routes = [
  {
    path: "/index",
    name: "index",
    component: Index,
    meta: { title: "首页" },
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    meta: { title: "充值" },
  },
  {
    path: "/activity",
    name: "activity",
    component: Activity,
    meta: { title: "活动" },
  },
];

const router = new Router({
  routes,
});

export default router;
