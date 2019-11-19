<template>
<div class="page-register">
    <article class="header">
        <header>
            <a href="/" class="site-logo" />
            <span class="login">
                <em class="bold">已有美团账号</em>
                <a href="/login">
                    <el-button type="primary" size="small">登录</el-button>
                </a>
        </span>
        </header>
    </article>
    <section>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" />
                <el-button size="mini" round @click="sendEmailMsg">发送验证码</el-button>
                <span class="status">{{ statusMsg }}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code" maxlength="4" />
            </el-form-item>
            <el-form-item label="密码" prop="psw">
                <el-input v-model="ruleForm.psw" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="cpsw">
                <el-input v-model="ruleForm.cpsw" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
                <div class="error">{{ error }}</div>
            </el-form-item>
        </el-form>
    </section>
</div>
</template>
<script>
import cryptoJs from 'crypto-js'
export default {
    layout: 'blank',
    data() {
        return {
            statusMsg: '',
            error: '',
            ruleForm: {
                name: '',
                email: '',
                code: '',
                psw: '',
                cpsw: ''
            },
            rules: {
                name: [
                    { required: true, type: 'string', message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                psw: [{ required: true, message: '创建密码', trigger: 'blur' }],
                cpsw: [
                    { required: true, message: '确认密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.ruleForm.psw) {
                                callback(new Error('两次输入密码不一致'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        sendEmailMsg() {
            const self = this
            let namePass = ''
            let emailPass = ''
            // 判断定时器存在，直接跳出方法
            if (self.timer) {
                return false
            }
            self.statusMsg = ''
            // 验证用户名
            self.$refs.ruleForm.validateField('name', (valid) => { namePass = valid })
            // 验证邮箱
            self.$refs.ruleForm.validateField('email', (valid) => { emailPass = valid })
            // 验证通过
            if (!namePass && !emailPass) {
                self.$axios.post('/users/verify', {
                    username: encodeURIComponent(self.ruleForm.name),
                    email: self.ruleForm.email
                }).then(({ status, data }) => {
                    if (status === 200 && data && data.code === 0) {
                        let count = 60
                        self.statusMsg = `验证码已发送，剩余${count--}s`
                        self.timer = setInterval(() => {
                            self.statusMsg = `验证码已发送，剩余${count--}s`
                            if (count === 0) {
                                self.statusMsg = ''
                                clearInterval(self.timer)
                            }
                        }, 1000)
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                })
            }
        },
        register() {
            const self = this
            this.$refs.ruleForm.validate((valid) => {
                // 验证通过
                if (valid) {
                    self.$axios.post('/users/singup', {
                        username: encodeURIComponent(self.ruleForm.name),
                        password: cryptoJs.MD5(self.ruleForm.psw).toString(),
                        email: self.ruleForm.email,
                        code: self.ruleForm.code
                    }).then(({ status, data }) => {
                        if (status === 200) {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: data.msg,
                                    type: 'success'
                                })
                                setTimeout(() => {
                                    location.href = '/login'
                                }, 2000)
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        } else {
                            this.$message({
                                message: `服务器出错，错误码:${status}`,
                                type: 'error'
                            })
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang='scss'>
@import '@/assets/css/register/index.scss';
</style>
