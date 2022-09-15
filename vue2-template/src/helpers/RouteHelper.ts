import Vue, { ComponentOptions, AsyncComponent } from 'vue';
import Router, { RouteConfig } from 'vue-router';

interface Dictionary<T> {
  [key: string]: T;
}

export interface IRouteConfig {
  /**
   * 是否开发调试页面
   */
  isDev?: boolean;
  /**
   * 赋空值就可以，初始化路由后会自动赋值
   */
  name?: string;
  component: ComponentOptions<Vue> | typeof Vue | AsyncComponent;
  meta: {
    title: string;
  };
  children?: IRouteConfigs;
}
export interface IRouteConfigs {
  [route: string]: IRouteConfig;
}

// 开发页面
let DEV_ROUTE: RouteConfig;
const APP_PATH = '/app';
// 404路由名称
const NOT_FOUND_ROUTE_NAME = 'notFound';
// 所有路由名称
const ALL_ROUTE_NAMES: string[] = [];
// 路由配置
const ROUTE_CONFIG: { router?: Router; routes: RouteConfig[] } = {
  routes: [],
};

export const defineRouteConfig = <T extends IRouteConfigs>(configs: T): T => {
  return configs;
};

export class RouteHelper {
  /**
   * 初始化路由配置
   * @param routeConfigs 路由配置
   */
  static initRoutes(routeConfigs: IRouteConfigs): Router {
    const routes = getRoutes(routeConfigs);
    if (DEV_ROUTE) {
      routes.push(DEV_ROUTE);
    }
    // 默认路由
    routes.push({ path: APP_PATH, redirect: { name: routes[0].name } });
    // 404页 固定
    routes.push({ path: '*', redirect: { name: NOT_FOUND_ROUTE_NAME } });
    const router = new Router({
      mode: 'history',
      routes,
    });
    router.beforeEach((to, from, next) => {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      next();
    });
    ROUTE_CONFIG.routes = routes;
    ROUTE_CONFIG.router = router;
    return router;
  }

  /**
   * 获取当前路由
   */
  static currentRouter(): Router {
    if (!ROUTE_CONFIG.router) {
      throw new Error('尚未初始化路由');
    }
    return ROUTE_CONFIG.router;
  }

  /**
   * 跳转路由
   * @param routeName 路由名称
   * @param query 路由参数
   */
  static go(routeName: string, query?: Dictionary<string | string[]>) {
    const router = this.currentRouter();
    return router.push({
      name: routeName,
      query,
    });
  }

  /**
   * 替换路由
   * @param routeName 路由名称
   * @param query 路由参数
   */
  static replace(routeName: string, query?: Dictionary<string | string[]>) {
    const router = this.currentRouter();
    return router.replace({
      name: routeName,
      query,
    });
  }
}

// 路由父节点
let PARENT_ROUTE_NAMES: string[] = [];
/**
 * 获取路由配置
 */
function getRoutes(routeConfigs: IRouteConfigs): RouteConfig[] {
  const routeConfigKeys = Object.keys(routeConfigs);
  const routes = routeConfigKeys.map(key => {
    const routeConfig = routeConfigs[key];
    const parentPath = PARENT_ROUTE_NAMES.length > 0 ? PARENT_ROUTE_NAMES.join('/') + '/' : '';
    routeConfig.name = `${parentPath}${key}`;
    if (ALL_ROUTE_NAMES.indexOf(routeConfig.name) > -1) {
      throw new Error(`路由名称 ${routeConfig.name} 已存在，请重新命名！`);
    } else {
      ALL_ROUTE_NAMES.push(routeConfig.name);
    }
    if (routeConfig.isDev) {
      DEV_ROUTE = {
        path: '/',
        redirect: { name: routeConfig.name },
      };
      // LogHelper.debug(`默认路由:${APP_PATH}/${routeConfig.name}`, 'router');
    }

    const route: RouteConfig = {
      path: `${APP_PATH}/${routeConfig.name}`,
      name: routeConfig.name,
      component: routeConfig.component,
      meta: routeConfig.meta,
    };
    if (routeConfig.children) {
      PARENT_ROUTE_NAMES.push(key);
      route.children = getRoutes(routeConfig.children);
      if (route.children && route.children.length > 0) {
        route.redirect = route.children[0];
      }
    }
    // LogHelper.debug(`${routeConfig.meta.title}:${route.path}`, 'router');
    return route;
  });
  PARENT_ROUTE_NAMES = [];
  return routes;
}
