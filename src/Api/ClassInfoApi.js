import * as URL from './Url'
import { baseQuery } from './BaseQuery'

export async function fetchClassInfo (schoolId, classId) {
    let data = await baseQuery(URL.URL_GET_CLASS_INFO, {
        schoolid: schoolId,
        classid: classId,
    })
    return data
}

export async function fetchClassMembers (schoolId, classId) {
    let data = await baseQuery(URL.URL_GET_CLASS_MEMBERS, {
        schoolid: schoolId,
        classid: classId,
    })
    return data
}

