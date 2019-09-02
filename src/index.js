// Import all the third party stuff
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { configureStore } from './Store';
import 'Styles/index.less';
import { HashRouter as Router} from "react-router-dom";
import AppView from "./Modules";
import adjustCss from 'Styles/js/flexible_css';
import adjustfunc from 'Styles/js/flexible';
import {iNoBounce,isIPhone} from 'Styles/js/iosnobounce'
import { Platform, Event, Video } from 'thanos';
import { addEventListener, ljUserInfo } from 'ljshell';
import { GlobalVars } from 'Constants'
import { fetchClassInfo, fetchClassMembers } from 'Api'
import './Common/ExtendPrototype'

if(window.location.hash) {
    console.log("班级信息",window.location);
    let index = window.location.hash.indexOf('#/homeparam/');
    if (index === 0){
        let hash = window.location.hash.substring(12);
        window.location.hash = '#/';
        console.log("班级信息1",hash);
        if(hash) {
            let fields = hash.split('/')
            if (fields.length >= 3){
                GlobalVars["schoolid"] = parseInt(fields[0],10);
                GlobalVars["classid"] = parseInt(fields[1],10);
                GlobalVars["citycode"] = fields[2];
                if (fields.length >= 6){
                    GlobalVars["vendorid"] = parseInt(fields[3],10);
                    GlobalVars["deviceid"] = parseInt(fields[4],10);
                    GlobalVars["serial"] = fields[5];
                }
            }
            console.log('***************** GlobalVars:', GlobalVars);
        }
    }
}

addEventListener("keyboard", (event, args) => {
    console.log(".................on Keyboard Event",args);
    Event.fire(event, args);
    if (args === 0 && window.keyboardShown) {
        if (Platform.isIPhone()) {
            document.body.scrollTop = 0;
        } else {
           document.documentElement.style.transform = `translate3d(0, 0, 0)`;
           document.documentElement.style.webkitTransform = `translate3d(0, 0, 0)`;
        }
        window.keyboardShown = false;
    }
});

// Application will enter background
addEventListener('background', (event, args) => {
    if (Platform.isMobile()) {
        Video.stop();
    }
});

adjustCss();
adjustfunc(window, window['lib'] || (window['lib'] = {}));

if (isIPhone()) {
    iNoBounce.enable();
    document.body.style.cursor = 'pointer';
}

if (Array.prototype.includes === undefined) {
    Array.prototype.includes = function (val) {
        console.log("这个是我自己的方法", val, this);
        return this.indexOf(val) > 0
    }
}

window.FindReact = function (dom) {
    for (var key in dom) {
        if (key.startsWith("__reactInternalInstance$")) {
            var compInternals = dom[key].return.pendingProps;
            if (!compInternals){
                return null;
            }
            var compWrapper = compInternals.children._owner;
            if (!compWrapper) {
                return null;
            }
            var comp = compWrapper.stateNode;
            // var compInternals = dom[key]._currentElement;
            // var compWrapper = compInternals._owner;
            // var comp = compWrapper._instance;
            return comp;
        }
    }
    return null;
};

if (Platform.isWindows() && !window.onkeydown) {
    window.onkeydown = function (e) {
        var ev = e || window.event; //获取event对象
        var obj = ev.target || ev.srcElement; //获取事件源
        var t = obj.type || obj.getAttribute('type'); //获取事件源类型
        //获取作为判断条件的事件类型
        if (obj.isContentEditable) {
            t = "text";
        }
        var vReadOnly = obj.readOnly;
        var vDisabled = obj.disabled;
        //处理undefined值情况
        vReadOnly = (vReadOnly === undefined) ? false : vReadOnly;
        vDisabled = (vDisabled === undefined) ? false : vDisabled;
        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
        //并且readOnly属性为true或disabled属性为true的，则退格键失效
        var flag1 = ev.keyCode === 8 &&
            (t === "password" || t === "text" || t === "textarea") &&
            (vReadOnly === true || vDisabled === true);
        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
        var flag2 = ev.keyCode === 8 && t !== "password" && t !== "text" && t !== "textarea";
        //判断
        if (flag2 || flag1) return false;
    }
}

function reRender () {
    render()
}

render()
let store = {}
async function render () {
    try {
        const userInfo = await new Promise((resolve, reject) => {
            ljUserInfo.getInfo(0, info => {
                resolve(info)
            })
        })

        const classInfo = await fetchClassInfo(GlobalVars.schoolid, GlobalVars.classid)
        const classMembers = await fetchClassMembers(GlobalVars.schoolid, GlobalVars.classid)
        GlobalVars.classInfo = classInfo.info
        GlobalVars.classMembers = classMembers.users;

        // Create redux store
        store = configureStore({userInfo: userInfo})

        if (process.env.NODE_ENV === 'development') {
            console.log('----------- store:', store.getState())
            // 等待ljbase 中 RouterParam 异步读取 param 后再加载页面。保证调试状态下
            // 页面刷新后，路由参数可以正常获取。
            setTimeout(() => {doRender(store)}, 500)
        } else {
            doRender(store)
        }
    } catch (err) {
        ReactDOM.render(
            <AppContainer>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p>{err.message}</p>
                    <button onClick={reRender}>重试</button>
                </div>
            </AppContainer>
            , document.getElementById('root')
        )
    }
}

function doRender (store) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <AppView/>
                </Router>
            </Provider>
        </AppContainer>
        , document.getElementById('root')
    )
}
