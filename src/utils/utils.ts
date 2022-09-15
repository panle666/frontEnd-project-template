import DialogHelper from '@/helpers/DialogHelper';
const fastOperationCalclator = {};

export default class Utils {
  /**
   * 是否快速操作
   *
   * @static
   * @param key 区分同一点击的唯一键
   * @param count 间隔时间内点击次数
   * @param time 间隔时间/毫秒
   */
  static isFastOperation(key: string, count = 5, time = 1000) {
    if (!fastOperationCalclator[key] || !Array.isArray(fastOperationCalclator[key])) {
      fastOperationCalclator[key] = [];
    }
    fastOperationCalclator[key].push(Date.now());
    const calcLength = fastOperationCalclator[key].length;
    // console.log('fastOperationCalclator:', fastOperationCalclator);
    if (calcLength >= count) {
      if (fastOperationCalclator[key][calcLength - 1] - fastOperationCalclator[key][calcLength - count] < time) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * 阻断快速操作（比如频繁点击等等）
   * @param breakTips 阻断时提示，空则不提示
   * @returns
   */
  static breakFastOperation(target, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const operationKey = `${name}(${args.join()})`;
      if (Utils.isFastOperation(operationKey, 2, 500)) {
        // LogHelper.warn(`快速操作触发阻断 ： ${operationKey}`);
        return;
      }
      return await method.apply(this, args);
    };
  }

  /**
   * 加载中装饰器
   * @param message 加载中提示
   * @param duration 加载中超时时间
   * @returns
   */
  static loading(message = '加载中...', duration = 1000 * 10) {
    return (target, name: string, descriptor: PropertyDescriptor) => {
      const method = descriptor.value;
      descriptor.value = async function(...args: any[]) {
        DialogHelper.loadingStart(message, duration);
        const result = await method.apply(this, args);
        DialogHelper.loadingEnd();
        return result;
      };
    };
  }

  /**
   * 休眠
   * @param timeout 休眠时间，毫秒
   */
  static sleep(timeout: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  }

  /**
   * 图片压缩
   * @param file 上传的图片文件
   * @param config 配置
   */
  static imgCompress(file: File, config: { maxWidth?: number; quality: number }) {
    return new Promise<Blob>((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ev => {
          const img = new Image();
          img.src = fileReader.result as string;
          img.onload = () => {
            let w = img.width;
            let h = img.height;
            // 默认按比例压缩
            const scale = w / h;
            if (config.maxWidth < w) {
              w = config.maxWidth;
              h = w / scale;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const anw = document.createAttribute('width');
            anw.nodeValue = w.toString();
            const anh = document.createAttribute('height');
            anh.nodeValue = h.toString();
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            // 图片质量
            const quality = config.quality > 0 && config.quality <= 1 ? config.quality : 0.7;
            canvas.toBlob(resolve, file.type, quality);
          };
        };
        fileReader.addEventListener('error', async ev => {
          await DialogHelper.alert(`该图片读取失败:${fileReader.error.message}，请使用拍照等方式上传`);
          reject(file);
        });
      } catch (error) {
        // LogHelper.error(error);
        reject(file);
      }
    });
  }

  /**
   * 复制文本
   * @param text 文本
   */
  static copy(text: string) {
    try {
      const ele = document.createElement('textarea');
      ele.value = text;
      ele.setAttribute('readonly', '');
      ele.style.position = 'absolute';
      ele.style.left = '-9999px';
      document.body.appendChild(ele);
      const n = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0);
      ele.select();
      document.execCommand('copy');
      document.body.removeChild(ele);
      if (n) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(n);
        return true;
      }
    } catch (error) {
      // LogHelper.error(error);
    }
    return false;
  }

  /**
   * ios在微信的webview，键盘收回，页面底部会留白,在input失去焦点以后调用一下页面滚动使页面恢复正常
   */
  // static hackInputBug() {
  //   if (PlatformHelper.isIOS()) {
  //     let currentPosition;
  //     const speed = 1; // 页面滚动距离
  //     const timer = setInterval(() => {
  //       currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  //       currentPosition -= speed;
  //       window.scrollTo(0, currentPosition); // 页面向上滚动
  //       currentPosition += speed; // speed变量
  //       window.scrollTo(0, currentPosition); // 页面向下滚动
  //       clearInterval(timer);
  //     }, 1);
  //   }
  // }

  static isWeakPassword(str: string) {
    const reg = /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/;
    return !reg.test(str);
  }
}

/**
 * 浏览器导航类型
 */
export const NavigationType = {
  /**
   * 当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址，type值为0
   */
  NAVIGATE: 0,
  /**
   * 点击刷新页面按钮或者通过Location.reload()方法显示的页面，type值为1
   */
  RELOAD: 1,
  /**
   * 页面通过历史记录和前进后退访问时。type值为2
   */
  BACK_FORWARD: 2,
  /**
   * 任何其他方式，type值为255
   */
  RESERVED: 255,
};
