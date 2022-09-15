import Vue from 'vue';
import Router from 'vue-router';
import { defineRouteConfig, RouteHelper } from '@/helpers/RouteHelper';

Vue.use(Router);

export const RouteConfigs = defineRouteConfig({
  index: {
    isDev: true,
    name: '',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index/main.vue'),
    meta: {
      title: '首页',
    },
  },
  address: {
    name: '',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/address.vue'),
    meta: {
      title: '地址模板页',
    },
    children: {
      addressList: {
        name: '',
        component: () => import(/* webpackChunkName: "address" */ '@/views/address/addressList/main.vue'),
        meta: {
          title: '地址列表',
        },
      },
      operateAddress: {
        name: '',
        component: () => import(/* webpackChunkName: "operateAddress" */ '@/views/address/operateAddress/main.vue'),
        meta: {
          title: '操作地址',
        },
      },
    },
  },
});
const router = RouteHelper.initRoutes(RouteConfigs);
export default router;
