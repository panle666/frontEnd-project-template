import { Toast, Dialog } from 'vant';
import { VanToast } from 'vant/types/toast';
import Utils from '@/utils/utils';

let LOADING_TOAST: VanToast;
let LOADING_TOAST_TIMER;
let IS_SHOWING_POPUP = false;

export default class DialogHelper {
  /**
   * 加载开始
   * @param message 加载中提示
   */
  static loadingStart(message = '加载中...', duration = 1000 * 10) {
    // Toast.allowMultiple(true);
    // 延时个300毫秒
    clearTimeout(LOADING_TOAST_TIMER);
    LOADING_TOAST_TIMER = setTimeout(() => {
      if (IS_SHOWING_POPUP) {
        return DialogHelper.loadingStart(message, duration);
      }
      LOADING_TOAST = Toast.loading({
        mask: true,
        forbidClick: true,
        message,
        duration,
      });
    }, 300);
  }

  /**
   * 加载结束
   */
  static loadingEnd() {
    clearTimeout(LOADING_TOAST_TIMER);
    if (LOADING_TOAST) {
      LOADING_TOAST.clear();
    }
  }

  /**
   * 显示灰色背景的消息提示框。
   * @param message 内容
   * @param icon 图标，取值范围包括success,loading, none
   * @param duration 提示框停留时间，单位ms 默认2500
   */
  static async toast(message: string, icon: 'success' | 'loading' | 'none' | 'warning' | 'error' = 'warning', duration = 2500) {
    if (!message) {
      return;
    }
    switch (icon) {
      case 'loading':
        IS_SHOWING_POPUP = true;
        Toast.loading({
          message,
          duration,
        });
        break;
      case 'warning':
      case 'error':
      case 'success':
        IS_SHOWING_POPUP = true;
        Toast({
          message: `<span class="k2-toast k2-toast-${icon}">${message}</span>`,
          type: 'html',
          duration,
        });
        break;
      default:
        IS_SHOWING_POPUP = true;
        Toast({
          message,
          duration,
        });
        break;
    }
    return new Promise<void>(resolve => {
      setTimeout(() => {
        IS_SHOWING_POPUP = false;
        resolve();
      }, duration);
    });
  }

  /**
   * 白色弹窗
   * @param message 弹窗内容
   */
  static alert(message: string, confirmButtonText = '确认') {
    if (LOADING_TOAST) {
      this.loadingEnd();
    }
    if (!message) {
      return;
    }
    if (Utils.isFastOperation(message, 2, 50)) {
      return;
    }
    return new Promise<void>(resolve => {
      IS_SHOWING_POPUP = true;
      Dialog.alert({
        message,
        confirmButtonText,
        beforeClose: (action, done) => {
          IS_SHOWING_POPUP = false;
          done();
          resolve();
        },
      });
    });
  }
}
