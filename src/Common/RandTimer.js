let handlers = []
let originSetTimeout = window.setTimeout

const addNewItem = (item) => {
    for (let i = 0; i < handlers.length; i++) {
        let curr = handlers[i]
        if (curr.tick > item.tick) {
            handlers.splice(i, 0, item)
            return
        }
    }
    handlers.push(item)
}

window.setTimeout = (handler, timeout) => {
    if (timeout % 1000 === 0) {
        let item = {
            handler,
            timeout,
            type: 0,
            tick: Math.floor(Math.random() * 50) * 20 + Date.now() + timeout
        }
        addNewItem(item)
    } else {
        originSetTimeout(handler, timeout)
    }
}

let originSetInterval = window.setInterval

window.setInterval = (handler, timeout) => {
    if (timeout % 1000 === 0) {
        let item = {
            handler,
            timeout,
            type: 1,
            tick: Math.floor(Math.random() * 1000) + Date.now() + timeout
        }
        addNewItem(item)
    } else {
        originSetTimeout(handler, timeout)
    }
}

originSetInterval(() => {
    while(true) {
        if(handlers.length === 0) return
        let top = handlers[0]
        let tick = Date.now()
        if(tick >= top.tick) {
            handlers.shift()
            Promise.resolve().then(top.handler)
            if(top.type === 1) {
                top.tick = top.tick + top.timeout
                addNewItem(top)
            }
        } else {
            break
        }
    }
}, 20);