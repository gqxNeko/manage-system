<template>
  <div class="login">
    <div class="container">
      <el-form ref="form" :model="form" :rules="rules" style="width:60%;margin:0 auto;">
        <el-form-item prop="userName">
          <!--细节，数字判断需要加个.number-->
          <el-input prefix-icon="el-icon-user" v-model.number="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item v-if="isRegister" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input prefix-icon="el-icon-lock" v-model="form.passWord" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item v-if="isRegister" prop="confirmPassWord">
          <el-input v-model="form.confirmPassWord" show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item class="item-bottom">
          <el-button type="text" size="normal" @click="login()">登录</el-button>
          <el-button type="text" size="normal" v-if="!isRegister" @click="register('form')">注册</el-button>
          <el-button type="text" size="normal" v-if="isRegister" @click="submit('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    let validName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'))
      } else {
        if (value.toString().length > 16) {
          callback(new Error('用户名长度不能超过16位'))
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
      } else if (this.form.passWord !== value) {
        callback(new Error('请输入相同的密码'))
      } else {
        callback()
      }
    }

    return {
      user: JSON.parse(localStorage.getItem('user')),
      isRegister: false,
      form: {
        userName: '',
        passWord: '',
        nickName: '',
        confirmPassWord: '',
      },
      rules: {
        userName: [{ validator: validName, trigger: ['blur', 'change'] }],
        nickName: [{ validator: validNickName, trigger: ['blur', 'change'] }],
        passWord: [{ validator: validPass, trigger: ['blur', 'change'] }],
        confirmPassWord: [
          { validator: checkPass, trigger: ['blur', 'change'] },
        ],
      },
    }
  },
  methods: {
    login() {
      if (
        this.user &&
        this.form.userName == this.user.name &&
        this.form.passWord == this.user.passWord
      ) {
        this.$parent.isLogin = true
        localStorage.setItem('loginState', true)
        console.log('登录成功')
      } else {
        this.$message('请先注册')
        console.log('登录失败')
        return false
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.form.userName,
            nickName: this.form.nickName,
            passWord: this.form.passWord,
          }
          localStorage.setItem('user', JSON.stringify(obj))

          localStorage.setItem('loginState', true)
          this.$message({
            type: 'success',
            message: '注册成功，自动登录。。。',
          })
          setTimeout(() => {
            this.$parent.isLogin = true
          }, 2000)

          console.log('success')
        } else {
          console.log('error')
          return false
        }
      })
    },
    register(formName) {
      this.isRegister = true
    },
  },
}
</script>
<style scoped>
.login {
  height: 100%;
  box-sizing: border-box;
  background: url('../assets/img/bg.jpg') center center;
}
.container {
  padding: 40px 0 0 0;
  width: 30%;
  margin: 0 auto;
  border-radius: 10px;
  transform: translateY(100px);
  box-sizing: border-box;
  box-shadow: inset 0 0 10px rgb(3 56 109);
}
</style>

<style>
.login .el-form-item {
  margin-bottom: 32px;
}
.login .el-input__inner {
  border-radius: 8px;
  transition: 0.7s;
  height: auto;
  line-height: 40px;
}

.login .el-form .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.login .item-bottom {
  padding: 20px 0 ;
}
.login .el-input__inner:focus,
.login .el-input__inner:hover {
  border: 1px solid rgba(102, 175, 233, 0.6);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.el-input__inner {
  background: #1c2027;
  border-color: transparent;
  color: #ccc;
}
.el-input__inner:hover,
.el-input__inner:focus {
  border-color: #0172e4 !important;
  box-shadow: none !important;
}
</style>