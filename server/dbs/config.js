export default {
    dbs: 'mongodb://127.0.0.1:27017/student', // 连接mongodb数据库
    redis: { // 连接redis数据库
        get host() {
            return '127.0.0.1'
        },
        get port() {
            return 6379
        }
    },
    smtp: { // 配置smtp服务发送邮件
        get host() {
            return 'smtp.qq.com'
        },
        // 获取用户
        get user() {
            return '2320949267@qq.com'
        },
        // 获取生成的授权码
        get pass() {
            return 'jwsgxuyzsnwqdigb'
        },
        // 设置验证码
        get code() {
            return () => {
                return Math.random().toString(16).slice(2, 6).toUpperCase()
            }
        },
        // 设置过期时间
        get expire() {
            return () => {
                return new Date().getTime() + 60 * 60 * 1000 * 30
            }
        }
    }
}
