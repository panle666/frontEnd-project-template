export default class FormatHelper {
  static formatTimestamp(timestamp: number) {
    const dateObj = new Date(timestamp);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const theDate = dateObj.getDate();
    // var hour = dateObj.getHours();
    // var minute = dateObj.getMinutes();
    // var second = dateObj.getSeconds();
    return `${this.addZero(year)}年${this.addZero(month)}月${this.addZero(theDate)}日`;
    // return `${this.addZero(year)}-${this.addZero(month)}-${this.addZero(
    //   theDate
    // )} ${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`;
  }

  static addZero(m: number) {
    return m < 10 ? '0' + m : m;
  }
}
