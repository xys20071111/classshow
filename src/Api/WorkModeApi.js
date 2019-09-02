import * as URL from './Url'
import { queryDataFromNetwork } from 'ljbase'

export async function getClassModeInfo(schoolid, classid) {
    let params = { schoolid, classid }
    let res = await queryDataFromNetwork(URL.URL_GET_CLASS_MODE_INFO, params)
    // console.log(res)
    if(res.ret) {
        return res.ret
    } 
    return {result: res.code, msg: res.msg}
}

export async function getClassExamInfo(schoolid, classid) {
    let params = { schoolid, classid }
    // console.log(params)
    let res = await queryDataFromNetwork(URL.URL_GET_CLASS_EXAM_INFO, params)
    // console.log(res)
    if(res.ret) {
        return res.ret
    } 
    return {result: res.code, msg: res.msg}
}