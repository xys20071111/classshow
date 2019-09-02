import appstr from 'Strings/936/home'

export const USER_ROLE_TEACHER   =   1;               //用户身份   --老师
export const USER_ROLE_PARENT    =   2;               //用户身份   --家长
export const USER_ROLE_MANAGER   =   4;               //用户身份   --管理者
export const USER_ROLE_STUDENT   =   8;              //用户身份   --学生
export const USER_ROLE_MASTER    =   (1 << 16) + 1   //班主任

export const APP_ID = 1222;

export const TAB_OPTIONS = {
    tabHeight: 70,
    //tabWidth: 150,
    fontSize: 26,
    color: '#333333',
    activeColor: '#03c0ab',
    disableColor: '#7F7F7F',
    background: '#FFFFFF',
    fontWeight: 400,
    tabTopGap: 20,
    tabBottomGap: 10,
    tabGap: 30,
    //align: 'center',
    tabMargin: 36,
    interval: 1,
    intervalColor: '#DDDDDD',
    inkSize: 6,
    inkColor: '#00baa6',
}

// 才艺秀类型
export const ART_TYPE_IMAGE = 21
export const ART_TYPE_AUDIO = 22
export const ART_TYPE_VIDEO = 30

export const GlobalVars = {
    schoolid: 57725568, // 马乐学校
    classid: 57728273,  // 马乐班级
    /* schoolid: 23378114,
    classid: 24808385, */
    citycode: "101010100",
    classisover: false,
    vendorid: 0,
    deviceid: 0,
    serial: '',
    classInfo: null,
}

export const EVENTS = {
    EVENT_GO_BACK: 'event_go_back',
    EVENT_ENTER_HOME_PAGE: 'event_enter_home_page',
    EVENT_LEAVE_HOME_PAGE: 'event_leave_home_page',
    EVENT_GOTO_PAGE: 'event_goto_page', // { name: '' } // kao-qin, ke-cheng, ban-ji, liu-yan
    EVENT_WEATHER_CHANGE: 'event_weather_change',
    EVENT_REFRESH_PAGE: 'event_refresh_page', // setinterval refresh page
    EVENT_KAOQIN_SUCESS: 'event_kaoqin_sucess',
}

export const PAGE_TITLE = {
    '#/artsShow': appstr.artsShowTitle,
    '#/notice/main': appstr.noticeTitle,
    '#/notice/detail': appstr.noticeTitle,
    '#/red': appstr.flowerRanking,
    '#/kaoqin': appstr.kaoqin,
    '#/studentonduty': appstr.dutyTitle,
    '#/timetabledetail': appstr.timetabledetail,
    '#/bestHomework': appstr.bestHomework,
}

export const ExamplePhoto = [
    '871fe3aaad9075eb895ff552d8145e246c3eefc2.png',
    'd2d7bfc1e33769e40ce37e747d7184ceb79f413f.png',
    '2d1a89e9c5a2b75a130f728003187f2108a58c40.png',
    'ddc81f44fc83dc588cad21c2847b2a7a8128d208.png',
    '01575b4f6d850602ba01c101b031c42c78111f1d.png',
]
