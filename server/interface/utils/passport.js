import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import userModel from '../../dbs/models/users'

// 根据用户名验证
passport.use(new LocalStrategy(async function (username, password, done) {
    const result = await userModel.findOne({ username })
    if (result != null) {
        if (result.password === password) {
            return done(null, result)
        } else {
            return done(null, false, '密码错误')
        }
    } else {
        return done(null, false, '用户不存在')
    }
}))

// 持久性验证登录信息，在sessios通过序列化进行验证
passport.serializeUser(function (user, done) {
    return done(null, user)
})

// 反序列化
passport.deserializeUser(function (user, done) {
    return done(null, user)
})

export default passport