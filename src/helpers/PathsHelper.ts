import { RouteHelper } from '@/helpers/RouteHelper';
import router, { RouteConfigs } from '@/router';

export default class PathsHelper {
  /**
   * 跳转通用webview页
   * @param toUrl 需跳转的链接
   */
  static ToWebView(toUrl) {
    return (location.href = toUrl);
  }

  /**
   * 去首页
   */
  static ToHome() {
    return RouteHelper.go(RouteConfigs.index.name);
  }

  /**
   * 返回上一页
   */
  static goBack(num = -1) {
    return router.go(num);
    // mpApi.navigateBack({
    //   delta: num,
    // });
  }

  /**
   * 去新增收货地址
   */
   static goAddAddress(addressId = '') {
    const params = {
      addressId,
    };
    return RouteHelper.go(RouteConfigs.address.children.operateAddress.name, params);
  }
}
