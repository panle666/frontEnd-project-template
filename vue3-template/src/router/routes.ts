import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routeConfigs: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/home/index.vue"),
  },
  // {
  //   path: "/detail",
  //   name: "detail",
  //   component: () => import("@/views/detail/index.vue"),
  // },
  // {
  //   path: "/back",
  //   name: "back",
  //   component: () => import("@/views/back/index.vue"),
  //   children: [
  //     {
  //       path: "login",
  //       name: "login",
  //       component: () => import("@/views/back/login/index.vue"),
  //     }
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeConfigs,
});

export default router;
