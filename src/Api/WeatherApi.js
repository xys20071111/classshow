import * as URL from './Url'
import { baseQuery } from './BaseQuery'

export async function fetchAreaList (areaId) {
    let data = await baseQuery(URL.URL_WEATHER_GETAREALIST, { areaid: areaId})
    return data
}

export async function fetchAreaInfoByName (areaName) {
    let data = await baseQuery(URL.URL_WEATHER_GETAREAFROMNAME, { name: areaName })
    return data
}

export async function fetchWeatherInfo (cityCode) {
    let data = await baseQuery(URL.URL_WEATHER_GETWEATHERINFO, { citycode: cityCode})
    data.weathercode = data.weathercode.substring(1)
    return data
}

