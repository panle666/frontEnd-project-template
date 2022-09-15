export interface IRouteConfig {
  /**
   * 是否开发调试页面
   */
  isDev?: boolean;
  path: string;
  component: any;
  title: string;
  children?: IRouterCommon[];
}

export interface IRouterCommon {
  path: string;
  component: any;
}
