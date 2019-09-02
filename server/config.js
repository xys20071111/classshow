export default {
    server:{
        port:8883
    },
    mysql:{
        dialect:"mysql",
        host:'192.168.13.12',
        port:3306,
        pool:{
            max: 8,
            min: 1,
            idle: 60000
        },
        database:'classshow',
        username:'ljlx',
        password:'Ljlx@123456'
    },
    redis:{
        classshow:{
            port:11179,
            auth_pass:'ljlx@123456',
            host:'192.168.13.12',
            db: 4,
            clientCount:1
        }
    }    
}
