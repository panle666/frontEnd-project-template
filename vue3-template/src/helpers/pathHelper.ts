import { routeConfigs } from "@/router/routes";
import { RouterHelper } from "./routerHelper";

export default class PathHelper {
  static toHome() {
    return RouterHelper.to("/index");
  }

  static toList() {
    return RouterHelper.to("/back/list");
  }

  static toDetail(id: string) {
    return RouterHelper.to("/detail", { id });
  }

  static toEdit(id: string) {
    return RouterHelper.to("/back/edit", { id });
  }

  static toLogin(returnUrl: string) {
    return RouterHelper.to("/back/login", { returnUrl });
  }
}
