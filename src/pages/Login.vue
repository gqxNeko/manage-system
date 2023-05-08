<template>
  <div class="login">
    <div class="title">博客系统</div>
    <div class="container">
      <el-form ref="form" :model="form" :rules="rules"
        style="width:80%;margin:0 auto;" >
        <el-form-item v-if="isRegister" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-user" v-model="form.userName"
            placeholder="请输入账号" @keyup.native.enter="login()"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password"
            show-password placeholder="请输入密码" @keyup.native.enter="login()"></el-input>
        </el-form-item>
        <el-form-item v-if="isRegister" prop="confirmPassWord">
          <el-input v-model="form.confirmPassWord" show-password
            placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item class="item-bottom">
          <el-button type="primary" size="normal"
            @click="login()">登录</el-button>
          <el-button type="text" size="normal" v-if="!isRegister"
            @click="register('form')">没有账号，前往注册</el-button>
          <el-button type="primary" size="normal" v-else
            @click="submit('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userLogin, userRegister } from '@api/api.js'
import { setCookie } from '../utils/cookie'
export default {
  name: 'Login',
  data () {
    let validName = (rule, name, callback) => {
      if (name === '') {
        callback(new Error('请输入账号'))
      }
      // 账号6-10位 英文、数字
      const reg = /[0-9|a-z|A-Z]{6,10}/g
      if (reg.test(name)) {
        callback(new Error('请输入6-10位的英文或者数字'))
      } else {
        if (name.length > 16) {
          callback(new Error('账号长度不能超过16位'))
        } else {
          callback()
        }
      }
    }

    let validNickName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入昵称'))
      } else {
        if (value.length > 10) {
          callback(new Error('昵称长度不能超过10位'))
        } else {
          callback()
        }
      }
    }
    let validPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.confirmPassWord !== '') {
          //验证核实的密码
          this.$refs.form.validateField('confirmPassWord')
        }
        callback()
      }
    }
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (this.form.password !== value) {
        callback(new Error('请输入相同的密码'))
      } else {
        callback()
      }
    }

    return {
      // user: JSON.parse(localStorage.getItem('user')),
      user: '',
      isRegister: false,
      form: {
        userName: '',
        password: '',
        nickName: '',
        confirmPassWord: '',
      },
      rules: {
        userName: [{ validator: validName, trigger: ['blur', 'change'] }],
        nickName: [{ validator: validNickName, trigger: ['blur', 'change'] }],
        password: [{ validator: validPass, trigger: ['blur', 'change'] }],
        confirmPassWord: [
          { validator: checkPass, trigger: ['blur', 'change'] },
        ],
      },
    }
  },
  methods: {
    login () {
      this.isRegister = false
      this.$refs.form.validate((validate) => {
        if (validate) {
          userLogin({
            userName: this.form.userName,
            password: this.form.password
          }).then((res) => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.msg)
            } else {
              setCookie('token', res.data.token, 7)
              setCookie('secret', res.data.secret, 7)
              setTimeout(() => {
                this.$message.success(res.data.msg)
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                this.$store.commit('setLoginState', true)
                this.$router.push('/home')
              }, 500);

            }
          }).catch(e=>{
            this.$message.error('服务器异常')
          })
        }
      })

    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            userName: this.form.userName,
            nickName: this.form.nickName,
            password: this.form.password,
          }
          userRegister(param).then(res => {
            if (res.data.code == 200) {
              setCookie('token', res.data.token, 7)
              setCookie('secret', res.data.secret, 7)
              setTimeout(() => {
                this.$message.success(res.data.msg)
                localStorage.setItem('userInfo', JSON.stringify(param))
                this.$store.commit('setLoginState', true)
                this.$router.push('/home')
              }, 500);

            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    register (formName) {
      this.isRegister = true
    },
  },
}
</script>
<style scoped>
.login {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background: url('../assets/img/bg.jpg') center center; */
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.container {
  /* padding: 40px 0 0 0; */
  width: 30%;
  margin: 0 auto;
  border-radius: 10px;
  box-sizing: border-box;
  /* box-shadow: inset 0 0 10px rgb(3 56 109); */
}
.login ::v-deep .el-form-item {
  margin-bottom: 32px;
}
.login ::v-deep .el-input__inner {
  border-radius: 8px;
  transition: 0.7s;
  height: auto;
  line-height: 40px;
}

.login ::v-deep .el-form .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.login ::v-deep .item-bottom {
  padding: 20px 0;
}
.login ::v-deep .el-input__inner:focus,
.login ::v-deep .el-input__inner:hover {
  /* border: 1px solid rgba(102, 175, 233, 0.6);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6); */
  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); */
}
/* .el-input__inner {
  background: #1c2027;
  border-color: transparent;
  color: #ccc;
} */
/* .el-input__inner:hover,
.el-input__inner:focus {
  border-color: #0172e4 !important;
  box-shadow: none !important;
} */
</style>