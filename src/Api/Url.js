const URL_PREFIX = 'http://api.banpai.ljlx.com'

// arts show
export const URL_TALENT_GETTALENT = '/rest/talent/gettalent.ashx'
export const URL_GET_CLASS_ALBUM = '/classspace/space.ashx'

// class info
export const URL_GET_CLASS_INFO = URL_PREFIX + '/classshow/api/classInfo'
// class Members
export const URL_GET_CLASS_MEMBERS = URL_PREFIX + '/classshow/api/classMembers'

// 公告
const URL_PREFIX_NOTICE = 'http://notice.app.ljlx.com/notice'
export const URL_GET_SCHOOL_RECEIVE_LIST = URL_PREFIX_NOTICE + '/base/GetSchoolReceiveList'
export const URL_GET_CLASS_RECEIVE_LIST  = URL_PREFIX_NOTICE + '/base/GetClassReceiveList'
export const URL_GET_NOTICE_CONTENT      = URL_PREFIX_NOTICE + '/base/getnoticecontent'
export const URL_GET_SCHOOL_NEWS  = 'http://edunews.app.ljlx.com/edunews/getAllNewsInfListBySch.ashx'
export const URL_GET_NEWS_CONTENT = 'http://edunews.app.ljlx.com/edunews/getNewsDetailByID.ashx'
export const URL_GET_CLASS_EVENT_INFO = URL_PREFIX + '/classshow/api/getClassEventInfo'

// weather
export const URL_WEATHER_GETAREAFROMNAME = URL_PREFIX + '/weather/api/getareafromname'
export const URL_WEATHER_GETAREALIST     = URL_PREFIX + '/weather/api/getarealist'
export const URL_WEATHER_GETWEATHERINFO  = URL_PREFIX + '/weather/api/getweatherinfo'

export const URL_TIMETABLE_GETTIMETABLE = 'http://timetable.app.ljlx.com/newtimetable/timetable/class?'

//duty
export const URL_DUTY_QUERYDUTYDESCINFO  = URL_PREFIX + '/classshow/api/queryDutyDescInfo'
export const URL_DUTY_QUERYDUTYUSERINFO  = URL_PREFIX + '/classshow/api/queryDutyUserInfo'

/** kao qin */
export const URL_CLASS_TIME_SHEET        = 'http://school.app.ljlx.com/campus/statistic/daily/class';
export const URL_USER_TIME_SHEET        =  'http://school.app.ljlx.com/campus/statistic/daily/user';

// 获取班牌工作模式 / 获取班牌考试信息
export const URL_GET_CLASS_MODE_INFO     = URL_PREFIX + '/classshow/api/getClassModeInfo'
export const URL_GET_CLASS_EXAM_INFO     = URL_PREFIX + '/classshow/api/getClassExamInfo'
// 班级留言接口
export const URL_GET_CLASS_UNREAD_MSG    = URL_PREFIX + '/classshow/api/queryClassUnreadMsg'
export const URL_GET_MSG_INFO            = URL_PREFIX + '/classshow/api/queryMsgInfo'
export const URL_GET_USER_MSG            = URL_PREFIX + '/classshow/api/queryUserMsg'
export const URL_SEND_MSG                = URL_PREFIX + '/classshow/api/SendMsg'
export const URL_SET_MSG_READ            = URL_PREFIX + '/classshow/api/readMsg'
export const URL_GET_PARENT_LIST         = URL_PREFIX + '/classshow/api/parentList'

export const URL_BANPAI_SWIPE_CARD       = 'http://gate.kaoqin.ljlx.com/kaoqin/gate/banpaiSwipeCard'
