import * as URL from './Url';
import { baseQuery } from './BaseQuery';
import { getArriveStudent } from 'Modules/KaoQin/Store/Constants';


/** get kao qin data */
export async function classfetchKaoQinData(params) {
  let apiData = await baseQuery(URL.URL_CLASS_TIME_SHEET, params)
  const arrive = getArriveStudent(apiData);
  return { arrive, apiData };
}

/** get student every day kaoqin */
export async function classfetchUserTimeInfo(params) {
  let apiData = await baseQuery(URL.URL_USER_TIME_SHEET, params)
  console.log('学生考勤：',apiData);
  return apiData;
}
