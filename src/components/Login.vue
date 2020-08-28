<template>
  <div class="login">
    <div class="container">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        style="width:60%;margin:0 auto;"
      >
        <el-form-item label="用户名" prop="userName">
          <!--细节，数字判断需要加个.number-->
          <el-input v-model.number="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" v-if="isRegister" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="form.passWord" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="isRegister" prop="confirmPassWord">
          <el-input v-model="form.confirmPassWord" show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="primary" v-if="!isRegister" @click="register('form')">注册</el-button>
          <el-button type="primary" v-if="isRegister" @click="submit('form')">确定注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    let validName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字"));
      } else {
        if (value.toString().length > 16) {
          callback(new Error("用户名长度不能超过16位"));
        } else {
          callback();
        }
      }
    };

    let validNickName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入昵称"));
      } else {
        if (value.length > 10) {
          callback(new Error("昵称长度不能超过10位"));
        } else {
          callback();
        }
      }
    };
    let validPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirmPassWord !== "") {
          //验证核实的密码
          this.$refs.form.validateField("confirmPassWord");
        }
        callback();
      }
    };
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.form.passWord !== value) {
        callback(new Error("请输入相同的密码"));
      } else {
        callback();
      }
    };

    return {
      user: JSON.parse(localStorage.getItem("user")),
      isRegister: false,
      form: {
        userName: "",
        passWord: "",
        nickName: "",
        confirmPassWord: "",
      },
      rules: {
        userName: [{ validator: validName, trigger: ["blur", "change"] }],
        nickName: [{ validator: validNickName, trigger: ["blur", "change"] }],
        passWord: [{ validator: validPass, trigger: ["blur", "change"] }],
        confirmPassWord: [
          { validator: checkPass, trigger: ["blur", "change"] },
        ],
      },
    };
  },
  methods: {
    login() {
      if (
        this.user &&
        this.form.userName == this.user.name &&
        this.form.passWord == this.user.passWord
      ) {
        this.$parent.isLogin = true;
        localStorage.setItem('loginState',true);
        console.log("登录成功");
      } else {
        this.$message('请先注册');
        console.log("登录失败");
        return false;
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.form.userName,
            nickName: this.form.nickName,
            passWord: this.form.passWord,
          };
          localStorage.setItem("user", JSON.stringify(obj));

          localStorage.setItem('loginState',true);
          this.$message({
            type: "success",
            message: "注册成功，自动登录。。。",
          });
          setTimeout(() => {
            this.$parent.isLogin = true;
          }, 2000);

          console.log("success");
        } else {
          console.log("error");
          return false;
        }
      });
    },
    register(formName) {
      this.isRegister = true;
    },
  },
};
</script>
<style scoped>
.login {
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(to right, #1c92d2, #f2fcfe);
}
.container {
  padding: 100px 0;
  width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  transform: translateY(100px);
  box-sizing: border-box;

  background: linear-gradient(
    to right,
    rgba(201, 214, 255, 0.8),
    rgba(226, 226, 226, 0.8)
  );
}
</style>

<style>
.login .el-form-item {
  margin-bottom: 32px;
}
.login .el-input__inner {
  border-radius: 8px;
  transition: 0.7s;
}
.login .el-input__inner:focus,
.login .el-input__inner:hover {
  border: 1px solid rgba(102, 175, 233, 0.6);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
</style>