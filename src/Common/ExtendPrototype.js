String.prototype.format = function (args) {
    if (arguments.length > 0) {
        let result = this
        if (arguments.length === 1 && typeof(args) === 'object') {
            for (let key in args) {
                let reg = new RegExp('({'+key+'})','g')
                result = result.replace(reg, args[key])
            }
        } else {
            for (let i = 0; i < arguments.length; i++) {
                if(arguments[i] !== undefined) {
                    let reg = new RegExp('({['+i+']})','g')
                    result = result.replace(reg, arguments[i])
                }
            }
        }
        return result
    } else {
        return this
    }
}

Date.prototype.format = function (fmt) {
    const o = {
        "M+" : this.getMonth() + 1,                     //月
        "d+" : this.getDate(),                          //日
        "h+" : this.getHours(),                         //时
        "m+" : this.getMinutes(),                       //分
        "s+" : this.getSeconds(),                       //秒
        "S"  : this.getMilliseconds(),                  //毫秒
        "q+" : Math.floor((this.getMonth() + 3) / 3),   //季度
    }
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }

    for(var k in o) {
        if(new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}
