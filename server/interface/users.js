import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer' // 使用node发邮件的方法
import User from '../dbs/models/users' // 引入user模型
import config from '../dbs/config' // 引入配置的封装文件
import Passport from '../interface/utils/passport' // 密码验证方法
import axios from '../interface/utils/axios'
// 创建路由对象
// eslint-disable-next-line import/no-mutable-exports
const router = new Router({
    prefix: '/users'
})
// 获取redis客户端
const Store = new Redis().client

// 实现注册接口（使用post）
// eslint-disable-next-line require-await
router.post('/singup', async (ctx, next) => {

    const { username, password, email, code } = ctx.request.body // 通过解构赋值从 body中获取相应的参数
    // 验证code
    if (code) {
        // 从redis中获取储存的验证码
        const saveCode = await Store.hget(`nodemail:${username}`, 'code')
        // 获取过期时间
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
        // 判断验证码相等
        if (code === saveCode) {
            // 判断过期时间是否有效
            if (new Date().getTime() - Number(saveExpire) > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期'
                }
                return false
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
        }
    } else { // 验证码不存在
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
    // 验证user
    const dbUser = await User.find({ username }) // 在数据库中查询用户
    if (dbUser.length) {
        ctx.body = {
            code: -1,
            msg: '该用户已存在'
        }
        return false
    }

    // 用户不存在时将数据写入数据库
    const newUser = await User.create({ username, password, email })
    // 判断写入成功
    if (newUser) {
        ctx.body = {
            code: 0,
            msg: '注册成功'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
})

// 实现登录接口
// eslint-disable-next-line require-await
router.post('/singin', async (ctx, next) => {
    // 使用passport验证调用本地策略（这里是固定写法）
    return Passport.authenticate('local', (err, user, info, status) => {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else if (user) {
            ctx.body = {
                code: 0,
                msg: '登录成功'
            }
            // passport 登录用户初始化session
            return ctx.login(user)
        } else {
            ctx.body = {
                code: -1,
                msg: info
            }
        }
    })(ctx, next)
})

// 发送验证码
router.post('/verify', async (ctx, next) => {
    // 从传入的参数中获取用户名
    let { username, email } = ctx.request.body
    // 阻止频繁访问
    // 获取存储的过期时间
    const saveExpire = await Store.hget(`$nodemail:${username}`, 'expire')
    // 过期时间是否存在
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁'
        }
        return false
    }
    // 通过nodemail中间件发送邮件
    // 1邮件配置
    let transporter = nodeMailer.createTransport({
        host: config.smtp.host, // 主机
        post: config.smtp.post, // 端口
        // 监听其他端口(原: 465)
        secure: false,
        auth: {
            user: config.smtp.user, // 发送的邮箱
            pass: config.smtp.pass // 授权码
        }
    })

    // 新建一个验证码信息
    let ko = {
        code: config.smtp.code(), // 验证码的值
        expire: config.smtp.expire(), // 过期时间
        user: username, // 发送人的邮箱
        email // 接收人的邮箱
    }

    // 邮件信息配置
    let emailOption = {
        from: `认证邮件<${config.smtp.user}>`, // 发件地址
        to: ko.email, // 收件人邮箱
        subject: `网站的注册验证码`, // 标题
        html: `你的验证码是${ko.code}` // 发送的text或者html格式
    }

    // 发送
    await transporter.sendMail(emailOption, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            // hmset   为散列里面的一个或多个键设置值 OK  hmset('hash-key', obj)
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    // 接口返回
    ctx.body = {
        code: 0,
        msg: `验证码已发送, 有效期60s`
    }
})

// 退出
router.post('/exit', async (ctx, next) => {
    // 清除session中的用户信息
    await ctx.logout()
    // 检查是否是未登录登录
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0,
            msg: '退出成功'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '退出失败'
        }
    }
})

// 获取用户信息
// eslint-disable-next-line require-await
router.post('/getUser', async (ctx, next) => {
    // 判断是登录状态
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user
        ctx.body = {
            code: 0,
            user: username,
            email
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '用户未登录'
        }
    }
})

export default router
