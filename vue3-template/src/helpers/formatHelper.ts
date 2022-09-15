export default class FormatHelper {
  static formatTimestamp(timestamp: number) {
    var dateObj = new Date(timestamp);

    var year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var theDate = dateObj.getDate();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    return `${this.addZero(year)}-${this.addZero(month)}-${this.addZero(
      theDate
    )}`;
    // return `${this.addZero(year)}-${this.addZero(month)}-${this.addZero(
    //   theDate
    // )} ${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`;
  }

  static addZero(m: number) {
    return m < 10 ? "0" + m : m;
  }
}
