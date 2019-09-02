import appstr from 'Strings/936/Common'

// 以毫秒计
const MINUTE = 60 * 1000
const HOUR = MINUTE * 60

export const getZeroTimestamp = (timestamp, isMillisecond=true) => {
    const tmpTimestamp = isMillisecond ? timestamp : timestamp * 1000
    const date = new Date(tmpTimestamp)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
}

export const getRelativeDate = (timestamp, fmt='yyyy-MM-dd hh:mm:ss', isMillisecond=true) => {
    const tmpTimestamp = isMillisecond ? timestamp : timestamp * 1000
    const now = Date.now()
    const zero = getZeroTimestamp(now)
    const date = new Date(tmpTimestamp)

    if (now - tmpTimestamp < MINUTE) {
        return appstr.justnow
    } else if (now - tmpTimestamp < HOUR) {
        const minutes = Math.floor((now - tmpTimestamp) / MINUTE)
        return minutes + appstr.beforeMinutes
    } else if (tmpTimestamp > zero) {
        const hours = Math.floor((now - tmpTimestamp) / HOUR)
        return hours + appstr.beforeHours
    } else {
        return date.format(fmt)
    }
}

export const getYMDFromTimestamp = (timestamp, isMillisecond=true) => {
    let tmpTimestamp = isMillisecond ? timestamp : timestamp * 1000
    const date = new Date(tmpTimestamp)
    return {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate()
    }
}

export const getDateString = (timestamp, fmt, isMillisecond=true) => {
    let tmpTimestamp = isMillisecond ? timestamp : timestamp * 1000
    const date = new Date(tmpTimestamp)
    return date.format(fmt)
}

export const formatTime = (time, isMillisecond=true) => {
    const MINUTE = 60
    const HOUR = MINUTE * 60

    let second = Math.floor(isMillisecond ? time / 1000 : time)
    let h = Math.floor(second / HOUR)
    let minute = Math.floor((second % HOUR) / MINUTE)
    let remainSecond = second % MINUTE

    let str = ''
    if (h > 0) {
        str = h < 10 ? str + '0' + h : str + h
    }

    if (str !== '') {
        str += ':'
    }

    str = minute < 10 ? str + '0' + minute : str + minute
    str += ':'
    str = remainSecond < 10 ? str + '0' + remainSecond : str + remainSecond

    return str
}
