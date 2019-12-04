// 加载所用到的包文件
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'// 处理POST请求
import session from 'koa-generic-session' // 处理sessios
import Redis from 'koa-redis'
import json from 'koa-json' // 美化返回值的json格式
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')// 引入users接口

const app = new Koa()
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// session 配置
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
}))

// 配置post请求处理
app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))
// 使用json
app.use(json())

// 连接数据库
mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
})
// passport 验证
app.use(passport.initialize())
app.use(passport.session())

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)
    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
    // 引入路由
    app.use(users.routes()).use(users.allowedMethods()) // 用户的路由
    app.use(geo.routes()).use(geo.allowedMethods()) // 用户的路由
    app.use((ctx) => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
