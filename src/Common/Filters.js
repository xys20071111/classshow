let g_enterFilters = {}
let g_leaveFilters = {}
let g_lastKey = null

export const enterFilter = (key, callback, props) => {
    const pageEnter = g_enterFilters[key]
    pageEnter && pageEnter(g_lastKey)
    g_lastKey = key
    callback()
}

export const leaveFilter = (key, callback, props) => {
    const pageLeave = g_leaveFilters[key]
    pageLeave && pageLeave()
    callback()
}

export const registFilters = (key, enterFilter, leaveFilter) => {
    if (!g_enterFilters[key] && enterFilter && typeof enterFilter === 'function') {
        g_enterFilters[key] = enterFilter
    }
    if (!g_leaveFilters[key] && leaveFilter && typeof leaveFilter === 'function') {
        g_leaveFilters[key] = leaveFilter
    }
}
