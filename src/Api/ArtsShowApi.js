import * as URL from './Url'
import { baseQuery } from './BaseQuery'
import _ from 'lodash'

export async function fetchTalent(args) {
    let data = await baseQuery(URL.URL_TALENT_GETTALENT, args, 'fetch')
    const ut = data.ut
    for (let i = 0; i < ut.length; ++i) {
        ut[i].talent_content = JSON.parse(ut[i].talent_content)
    }
    return data
}

export async function fetchClassAlbum (args) {
    let data = await baseQuery(URL.URL_GET_CLASS_ALBUM, args, 'fetch')
    data = JSON.parse(data.content)
    data = _.get(data, 'v.v1')
    data = _.uniqBy(data, v => v.row_id)
    for (let i = 0; i < data.length; ++i) {
        data[i].content_value = JSON.parse(data[i].content_value)

        const imgStr = _.get(data, `[${i}].content_value.img`, '')
        let imgList = []
        if (imgStr !== '') {
            imgList = imgStr.split('|')
            for (let j = 0; j < imgList.length; ++j) {
                imgList[j] = imgList[j].split(',')[0]
            }
            data[i].type = 21
        }

        const video = _.get(data, `[${i}].content_value.video`, null)
        if (video) {
            data[i].type = 30
        }

        data[i].content_value.imgList = imgList
        const date = new Date(data[i].in_time)
        data[i].in_time = date.valueOf()
    }
    return data
}
