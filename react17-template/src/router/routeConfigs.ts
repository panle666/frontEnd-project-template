import { HaHa } from "../pages/haha/haha";
import { Home } from "../pages/home/home";
import { IRouteConfig } from "./IRouteConfig";

export const routeConfigs: IRouteConfig[] = [
  {
    path: "/home",
    title: "home",
    component: Home,
    isDev: true,
    //   children: [
    //     {
    //       path: "",
    //       component: "",
    //     },
    //   ],
  },
  {
    path: "/haha",
    title: "haha",
    component: HaHa,
  },
];
