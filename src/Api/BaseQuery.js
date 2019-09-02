import { queryDataFromNetwork } from 'ljbase'
import { ljHttpInfo } from 'ljshell'
import appstr from 'Strings/936/Common'
import _ from 'lodash'

// 将promise返回的错误（reject 或 抛出的异常），统一为标准异常抛出
export const throwError = err => {
    if (Object.prototype.toString.call(err) === '[object Object]') {
        const errstr = _.get(err, 'msg', appstr.unknowErr)
        throw new Error(errstr)
    } else if (Object.prototype.toString.call(err) === '[object Error]') {
        throw err
    } else if (Object.prototype.toString.call(err) === '[object String]') {
        throw new Error(err)
    } else {
        throw new Error(appstr.unknowErr)
    }
}

export const checkResponse = received => {
    const code = _.get(received, 'code')
    if (code !== 0) {
        throwError(received)
    }
    else {
        let status = _.get(received, 'ret.status', -1)
        if (status === -1) {
            status = _.get(received, 'ret.result', -1)
        }
        if (status !== -1 && status !== 0) {
            const msg = _.get(received, 'ret.msg', appstr.unknowErr)
            throwError(msg)
        }
    }
}

// type:
//       '': use queryDataFromNetwork
//  'fetch': use ljHttpInfo.fetch
//  'query': use ljHttpInfo.query
export async function baseQuery (url, arg, type='') {
    try {
        let received = null
        if (type === '') {
            received = await queryDataFromNetwork(url, arg)
        } else if (type === 'fetch') {
            received = await ljHttpInfo.fetch(url, arg)
        } else if (type === 'query') {
            received = await new Promise(resolve => {
                ljHttpInfo.query(url, arg, callback => {
                    resolve(callback)
                })
            })
        }
        console.log('----------> query:', url, arg, received)
        checkResponse(received)
        let data = _.get(received, 'ret.data', null)
        if (data === null) {
            data = _.get(received, 'ret', null)
        }
        if (data === null) {
            data = received
        }
        return data
    } catch (err) {
        console.log('==========> error:', url, arg, err)
        throwError(err)
    }
}
