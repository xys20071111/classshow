export function Date2YMD(date, simple = false) {
    if (!date) return '';
    if (typeof (date) === 'number') {
        date = new Date(date);
    } else if (typeof (date) === 'string') {
        return date;
    }
    if (!(date instanceof Date)) throw new Error('bad type:' + date);
    if (simple)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function DateString2Long(str, bEnd = false) {
    let fields = str.split('-');
    if (!fields || fields.length !== 3) throw Error('bad format:' + str);
    let date = new Date(parseInt(fields[0], 10), parseInt(fields[1], 10) - 1, parseInt(fields[2], 10), 0, 0, 0, 0);
    if (bEnd) {
        date.setHours(23, 59, 59, 0);
    }
    return Math.floor(date.getTime() / 1000);
}

export function Number2DateStr(value, isms = false) {
    let date = new Date()

}
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

const week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
};
const _format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export const FormatDate= (date, fmt) => {
    return _format.apply(date, [fmt]);
}

export const formatSeconds = (value,apdex=['时','分','秒']) => {
    let secondTime = parseInt(value,10);
    let minuteTime = 0;
    let hourTime = 0;
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60,10);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60,10);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60,10);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60,10);
      }
    }
    const secod = parseInt(secondTime,10);
    let result = secod !== 0 ? `${parseInt(secondTime,10)}${apdex[2]}` : '';

    if(minuteTime > 0) {
        result = `${parseInt(minuteTime,10)}${apdex[1]}${result}`;
    }
    if(hourTime > 0) {
        result = `${parseInt(hourTime,10)}${apdex[0]}${result}`;
    }
    return result;
}