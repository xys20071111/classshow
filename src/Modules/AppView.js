import React from 'react';
import _ from 'lodash';
import * as actions from './UserInfoStore/UserInfoAction'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BaseComponent } from 'ljbase'
import { ljAppObject, addEventListener, removeEventListener } from 'ljshell';
import { View, Event, Toast } from 'thanos'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-keeper'
import HomeView, { FooterBar, HeadView } from '../Modules/Home/index';
import { ArtsShow } from 'Modules/ArtsShow'
import signView from '../Modules/Sign/view/index'
import FlowerInfoList from 'Components/ui/RankingFlower/FlowerInfoList';
import KaoQinInfoList from 'Modules/KaoQin/Views/KaoQinInfoList';
import timeTableDetailView from '../Modules/TimeTableDetail/view/index';
import studentOnDuty from '../Modules/StudentOnDuty/view/index';
import BindSetting from 'Modules/BindSetting';
import { SelfCenter } from 'Modules/SelfCenter';
import { EVENTS, WeatherInfo } from 'Constants';
import { Notice } from 'Modules/Notice'
import { GlobalVars } from '../Constants/Common';
import { enterFilter, leaveFilter } from 'Common'
import { swipeCard } from 'Api';
import { ShowAsModal, PostAuthCheck } from './SelfCenter/views/AuthCheck';
import { Control } from 'react-keeper'
import { VideoListener } from './SelfCenter';
import BestHomework from './BestHomework'

class UIContentView extends BaseComponent {

    saveRef = (name) => {
        return node => {
            this[name] = node;
        };
    }

    onReturnBindKey = () => {
        if (!Event.fire('back')) {
        }
        let res = {};
        res.keepcallback = 1;
        return res;
    }

    onNavBarHeightChanged = () => {
        let rescenterFrame = ReactDOM.findDOMNode(this['rescenter-frame']);
        let rescenterContent = ReactDOM.findDOMNode(this['rescenter-content']);
        let contentHeight = rescenterFrame.clientHeight;
        rescenterContent.style.height = `${contentHeight - 1}px`;
    }

    componentDidMount() {
        addEventListener('onScanCardInfo', this.onScanCard, false);
        Event.subscribe(EVENTS.EVENT_WEATHER_CHANGE, this.onEvent, true);
    }

    componentWillUnmount() {
        removeEventListener('onScanCardInfo', this.onScanCard);
    }

    enterFilter(path, callBack) {
        if (path === '/') {
            document.querySelector('.contentbarview').style.display = 'none'
        } else {
            document.querySelector('.contentbarview').style.display = 'block'
        }
        this.setState({ hash: path })
        callBack();
    }

    close = () => {
        ljAppObject.closeWebView()
    }

    RefreshUi = () => {
        let rescenterFrame = ReactDOM.findDOMNode(this['classshowmainview']);
        if (rescenterFrame) {
            let homeDom = window.FindReact(rescenterFrame);
            if (homeDom) {
                homeDom.updateUi(true);
            }
        }
    }

    onScanCard = (event, params) => {
        try {
            // if(this.alert) this.alert.close()
            // this.alert = Modal.alert(params.cardno)
            // return
            // alert(JSON.stringify(params))
            if (typeof (params.user_id) === 'undefined') {
                ShowAsModal(2, '未绑定此卡!')
                return
            }
            //是否本校管理员
            let is_student = params.user_role === 1
            let is_manager = (params.user_role >= 4)
            is_manager = is_manager && params.school_id === GlobalVars.schoolid
            //是否本班老师
            let is_master = GlobalVars.classInfo && GlobalVars.classInfo.masterid === params.user_id
            //跳转到配置页面
            if (!is_student) {
                if (is_master || is_manager) {
                    PostAuthCheck(null)
                    Control.go('/bind', { serial: GlobalVars.serial, vendorid: GlobalVars.vendorid, deviceid: GlobalVars.deviceid })
                }
                return
            }
            //判断学生考取刷卡
            params.check_result = is_student
            if ((params.school_id !== GlobalVars.schoolid || params.class_id !== GlobalVars.classid) && params.check_result) {
                params.check_result = false
                ShowAsModal(2, '仅限本班学生使用!')
            }
            //判断是否需要验证视频身份
            if(this.videoListener
                && this.videoListener.testChartList
                && this.videoListener.testChartList(params)) {
                return
            }
            //判断身份认证事件
            if (!PostAuthCheck(params)) {
                //如果不是学生或者本班,不进行考勤
                if (!params.check_result) return
                swipeCard(params)
                    .then(res => {
                        if (res.result === 0) {
                            Event.fire(EVENTS.EVENT_KAOQIN_SUCESS, null);
                            ShowAsModal(1, '考勤成功!')
                        } else {
                            throw new Error(res.msg)
                        }
                    }).catch(err => {
                        Toast.show(err && err.toString())
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    onEvent = (args) => {
        if (args && args.weatherCode) {
            let info = WeatherInfo[args.weatherCode]
            if (info && info.type && this._weather_type !== info.type) {
                let res_frame = this['rescenter-frame'] && ReactDOM.findDOMNode(this['rescenter-frame'])
                if (res_frame) {
                    let class_names = res_frame.className.split(' ')
                    if (class_names) {
                        let wtype = info.type
                        if (wtype === 'sunny') {
                            let date = new Date()
                            if (date.getHours() <= 6 || date.getHours() >= 19) {
                                wtype = 'nsunny'
                            }
                        }
                        res_frame.className = class_names.map(cls_name => {
                            if (_.startsWith(cls_name, 'cs-theme-')) {
                                return 'cs-theme-' + wtype
                            } else {
                                return cls_name
                            }
                        }).join(' ')
                    }
                }
                this._weather_type = info.type
            }
            return true
        }
        return false
    }

    render() {
        return (
            <View className='rescenter cs-theme-default' ref={this.saveRef('rescenter-frame')}>
                <View className='content' ref={this.saveRef('rescenter-content')}>
                    <View className='bg-stage-0' />
                    <View className='bg-stage-1' />
                    <View className='bg-stage-2' />
                    <View className='bg-stage-3' />
                    <View className='bg-stage-4' />
                    <HashRouter>
                        <View className='contentview'>
                            <Route
                                ref={this.saveRef('classshowmainview')}
                                {...this.props}
                                enterFilter={[this.enterFilter.bind(this, '/'), enterFilter.bind(null, '/')]}
                                leaveFilter={leaveFilter.bind(null, '/')}
                                cache
                                path="/"
                                component={HomeView}
                            />
                            <View className='contentbarview'>
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/artsShow')}
                                    path="/artsShow"
                                    component={ArtsShow}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/red')}
                                    cache
                                    path="/red"
                                    component={FlowerInfoList}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/sign')}
                                    path="/sign"
                                    component={signView}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/timetabledetail')}
                                    path='/timetabledetail'
                                    component={timeTableDetailView}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/studentonduty')}
                                    path='/studentonduty'
                                    component={studentOnDuty}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/kaoqin')}
                                    cache
                                    path='/kaoqin'
                                    component={KaoQinInfoList}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/selfcenter')}
                                    path='/selfcenter'
                                    component={SelfCenter}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/notice')}
                                    path='/notice'
                                    component={Notice}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/bind')}
                                    path='/bind'
                                    component={BindSetting}
                                />
                                <Route
                                    enterFilter={this.enterFilter.bind(this, '/bestHomework')}
                                    path='/bestHomework'
                                    cache
                                    component={BestHomework}
                                />
                            </View>
                        </View>
                    </HashRouter>
                    <HeadView hash={this.state && this.state.hash} />
                    <FooterBar hash={this.state && this.state.hash} />
                </View>
                <VideoListener ref={ref => this.videoListener = ref} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUserInfoChanged: (args) => dispatch(actions.actUserInfoChanged(args)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UIContentView));
