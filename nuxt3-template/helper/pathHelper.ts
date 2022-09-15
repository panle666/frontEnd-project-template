import { SSR_CONFIG } from "~~/constant/app.constant";

export default class PathHelper {
  static navTo(path: string, query: any = {}) {
    navigateTo({
      path,
      query,
    });
  }

  static toHome() {
    return (location.href = `${SSR_CONFIG.BASE_URL}`);
    // return PathHelper.navTo("/index");
  }

  static toDetail(id: string) {
    return (location.href = `${SSR_CONFIG.BASE_URL}/detail?id=${id}`);
    // return PathHelper.navTo("/detail", { id });
  }
}
