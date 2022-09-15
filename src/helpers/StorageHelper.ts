
class StorageHelper {
  /**
   * 设置本地缓存数据
   * @param key 本地缓存中的指定的 key
   * @param data 需要存储的内容
   */
  static set(key: string, data: string): boolean {
    try {
      localStorage.setItem(key, data);
      return true;
    } catch (error) {
      // LogHelper.error(error);
      return false;
      // return false;
    }
  }

  /**
   * 获取本地缓存数据
   * @param key 本地缓存中的指定的 key
   */
  static get(key: string): string {
    try {
      return localStorage.getItem(key) || '';
    } catch (error) {
      // LogHelper.error(error);
      return '';
    }
  }

  /**
   * 从本地缓存中移除指定 key
   * @param key 本地缓存中的指定的 key
   */

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      // LogHelper.error(error);
      return false;
    }
  }
}

export default StorageHelper;
