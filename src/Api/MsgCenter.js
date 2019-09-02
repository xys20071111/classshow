import * as URL from './Url'
import _ from 'lodash'
import { queryDataFromNetwork } from 'ljbase'
import { GlobalVars } from 'Constants'

//userMsg as array
export async function getClassUnreadMsg(schoolid, classid) {
    let params = { schoolid, classid }
    let res = await queryDataFromNetwork(URL.URL_GET_CLASS_UNREAD_MSG, params)
    if(res.ret) {
        return res.ret
    } 
    return {result: res.code, msg: res.msg}
}

//userMsg as array
export async function getUserMsgList(userid, index, count) {
    let params = { 
        userid, 
        schoolid: GlobalVars.schoolid,
        classid: GlobalVars.classid,
        recvid: userid,
        pageindex: index, 
        pageCount: count 
    }
    let res = await queryDataFromNetwork(URL.URL_GET_USER_MSG, params)
    if(res.ret) {
        return res.ret
    } 
    return {result: res.code, msg: res.msg}
}

/*
type	int	
类型 =0 文字 =1 语音 =2 离线视频 =3 及时视频
*/
export async function sendMsg(userid, content, type=0, duration=0) {
    let params = {
        // userid,
        schoolid: GlobalVars.schoolid,
        classid: GlobalVars.classid,
        content,
        type,
        duration,
        recvid: userid,
        sendid: userid,
        // issend: 0, 
    }
    let res = await queryDataFromNetwork(URL.URL_SEND_MSG, params)
    if(res.ret) {
        return res.ret
    }
    return {result: res.code, msg: res.msg}
}

export async function setMsgRead(userid, id) {
    let params = {
        userid,id, 
        schoolid: GlobalVars.schoolid,
        classid: GlobalVars.classid,
        recvid: userid, //学生就是接受者
    }
    let res = await queryDataFromNetwork(URL.URL_SET_MSG_READ, params)
    if(res.ret) {
        return res.ret
    }
    return {result: res.code, msg: res.msg}
}

export async function swipeCard(_params) {
    let params = {
        cardid : _.get(_params, 'cardno', ''),
        vendorid: _.get(_params, 'vendorid', 0),
        deviceid:_.get(_params, 'deviceid', 0),
        serial: _.get(_params, 'serial', ''),
        checkType: GlobalVars.classisover ? 1 : 0,
    }
    console.log(params)
    let res = await queryDataFromNetwork(URL.URL_BANPAI_SWIPE_CARD, params)
    if(res.ret) {
        return res.ret
    }
    return {result: res.code, msg: res.msg}
}

export async function getParentList(userid) {
    let params = {
        userid
    }
    let res = await queryDataFromNetwork(URL.URL_GET_PARENT_LIST, params)
    if(res.ret) {
        return res.ret
    }
    return {result: res.code, msg: res.msg}
}

//查询服务器的状态
export async function queryServerMsg() {
    
}

