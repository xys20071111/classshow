import * as URL from './Url'
import { baseQuery } from './BaseQuery'

export async function fetchDescInfo(args) {
    let data = await baseQuery(URL.URL_DUTY_QUERYDUTYDESCINFO, args)
    return data
}

export async function fetchUserInfo(args) {
    let data = await baseQuery(URL.URL_DUTY_QUERYDUTYUSERINFO, args)
    return data
}
