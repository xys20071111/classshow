import * as URL from './Url'
import { baseQuery } from './BaseQuery'
import _ from 'lodash'

export async function fetchNoticeAndNews(args) {
    let fetchs = [
        fetchSchoolNotice(args.schoolNotice),
        fetchClassNotice(args.classNotice),
        fetchSchoolNews(args.news)
    ]

    let received = await Promise.all(fetchs)
    let noticeData = []
    let newsData = []
    for (let i = 0; i < received.length; ++i) {
        const notice = _.get(received, `[${i}].noticeinfos`, [])
        const news = _.get(received, `[${i}].news_data`, [])
        noticeData.push(notice)
        newsData.push(news)
    }
    noticeData = _.flatten(noticeData)
    newsData = _.flatten(newsData)
    noticeData = _.uniqBy(noticeData, v => v.noticeid)
    newsData = _.uniqBy(newsData, v => v.news_id)
    let data = _.concat(noticeData, newsData)
    data = _.sortBy(data, v => -v.pubtime)
    return data
}

export async function fetchNotice(args) {
    let fetchs = [
        fetchSchoolNotice(args.schoolNotice),
        fetchClassNotice(args.classNotice),
    ]

    let received = await Promise.all(fetchs)
    let noticeData = []
    let totalNotice = 0
    for (let i = 0; i < received.length; ++i) {
        const notice = _.get(received, `[${i}].noticeinfos`, [])
        noticeData.push(notice)
        totalNotice += _.get(received, `[${i}].total`, 0)
    }
    noticeData = _.flatten(noticeData)
    noticeData = _.uniqBy(noticeData, v => v.noticeid)
    const data = _.sortBy(noticeData, v => -v.pubtime)
    return { total: totalNotice, data }
}

export async function fetchSchoolNotice (args) {
    const { schoolId, type, role, pageIndex, pageSize } = args
    const url = URL.URL_GET_SCHOOL_RECEIVE_LIST + `?schoolid=${schoolId}` +
        `&type=${type}` + `&begin=${pageIndex * pageSize}` + `&count=${pageSize}` + `&role=[${role}]`
    const data = await baseQuery(url, {
        method: 'GET',
        json: 2,
        wait: 1
    }, 'query')
    data.noticeinfos = _.filter(data.noticeinfos, v => v.title !== '')
    return data
}

export async function fetchClassNotice (args) {
    const { classId, type, role, pageIndex, pageSize } = args
    const url = URL.URL_GET_CLASS_RECEIVE_LIST + `?classid=${classId}` +
        `&type=${type}` + `&begin=${pageIndex * pageSize}` + `&count=${pageSize}` + `&role=[${role}]`
    const data = await baseQuery(url, {
        method: 'GET',
        json: 2,
        wait: 1
    }, 'query')
    data.noticeinfos = _.filter(data.noticeinfos, v => v.title !== '')
    return data
}

export async function fetchNoticeContentById (noticeId) {
    const url = URL.URL_GET_NOTICE_CONTENT + `?noticeid=${noticeId}`
    const data = await baseQuery(url, {
        method: 'GET',
        json: 2,
        wait: 1
    }, 'query')
    return data
}

export async function fetchSchoolNews (args) {
    const { schoolId, role, pageIndex, pageSize } = args
    const url = URL.URL_GET_SCHOOL_NEWS + `?schid=${schoolId}` + `&role=${role}` +
        `&pidx=${pageIndex}` + `&psize=${pageSize}`
    const data = await baseQuery(url, {
        method: 'GET',
        json: 2,
        wait: 1
    }, 'query')

    for (let i = 0; i < data.news_data.length; ++i) {
        let time = data.news_data[i].release_date
        time = time.replace('/Date(', '').replace(')/', '').substr(0, 10)
        data.news_data[i].pubtime = parseInt(time, 10)
        data.news_data[i].isNews = true
    }
    data.news_data = _.filter(data.news_data, v => v.news_title !== '')
    return data
}

export async function fetchNewsContentById (newsId) {
    const url = URL.URL_GET_NEWS_CONTENT + `?newsid=${newsId}`
    const data = await baseQuery(url, {
        method: 'GET',
        json: 2,
        wait: 1
    })
    return data
}

export async function fetchClassEvent (schoolId, classId) {
    const data = await baseQuery(URL.URL_GET_CLASS_EVENT_INFO, {
        schoolid: schoolId,
        classid: classId
    })
    return data
}
