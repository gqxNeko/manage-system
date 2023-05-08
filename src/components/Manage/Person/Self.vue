<template>
  <div class="self">
    <el-form status-icon ref="form" :model="form" :rules="rules"
      label-width="80px" style="width: 30%;margin: 0 auto;">
      <div class="block">
        <span class="changeAvatar">{{header}}</span>
        <el-upload class="avatar-uploader" :on-preview="handlePreview"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :auto-upload="true">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio v-for="(item,index) in sexOptions" :label="item.value"
            :key="item.label + index">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="form.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="修改密码" prop="password"
        :required="form.password.length?true:false">
        <el-input v-model="form.password" show-password clearable
          @clear="handleClear()"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword"
        :required="form.password.length?true:false"
        v-show="form.password.length">
        <el-input v-model="form.confirmPassword" show-password
          clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateUserInfo } from '@api/api'

import _deepClone from 'lodash'
export default {
  name: "Self",

  data () {
    let validPass = (rule, value, callback) => {
      console.log('pass:', { value })
      if (this.form.password !== value) {
        callback(new Error('请输入相同的密码'))
      } else if (value.length > 0 && (value.length < 6 || value.length > 12)) {
        callback(new Error('请输入6~12位密码'))
      } else {
        callback()
      }
    }
    // let checkPass = (rule, value, callback) => {
    //   console.log('confirmPass:', { value })
    //   if (this.form.password !== value) {
    //     callback(new Error('请输入相同的密码'))
    //   } else if (value.length < 6 || value.length > 12) {
    //     callback(new Error('请输入3~12位密码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      self: "个人中心",
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      imageUrl: localStorage.getItem("avatar"),
      header: "头像",
      id: "",
      fit: "fill",
      radio: "male",
      form: {
        id: '',
        userName: '',
        nickName: "",
        sex: "male",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      sexOptions: [
        {
          label: '男',
          value: 'male'
        },
        {
          label: '女',
          value: 'femal'
        }
      ],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["change", "blur"],
          },
          {
            min: 1,
            max: 10,
            message: "请输入1到10个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["change", "blur"],
          },
          {
            min: 1,
            max: 10,
            message: "请输入1到10个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: ["change", "blur"],
          },
          {
            type: "email",
            trigger: ["change", "blur"],
            message: "格式不正确请重新输入！",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入电话号",
            trigger: ["change", "blur"],
          },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的电话号",
          },
        ],
        password: [
          {
            validator: validPass,
            trigger: ["blur", "change"],
          },
        ],
        confirmPassword: [
          {
            validator: validPass,
            trigger: ['change', 'blur']
          }]
      },
    };
  },
  created () {
    if (!this.imageUrl) {
      this.imageUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
    this.form = this.userInfo
    this.$set(this.form, 'password', '')
    this.$set(this.form, 'confirmPassword', '')
  },
  mounted () { },
  methods: {

    handleClear () {
      this.form.password = ''
      this.form.confirmPassword = ''
    },
    onSubmit (formName) {
      let targetParam = JSON.parse(JSON.stringify(this.form))
      delete targetParam.confirmPassword
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          updateUserInfo(targetParam).then(res => {
            if (res?.data?.code == 200) {
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      });
    },
    reset (formName) {
      this.$refs[formName].resetFields();
    },
    handlePreview (file) {
      console.log(file);
    },
    handleAvatarSuccess (res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 50%;
}
</style>
<style scoped>
.block {
  display: flex;
  padding-left: 12px;
  padding-bottom: 18px;
}
.changeAvatar {
  font-size: 14px;
  color: #606266;
  margin-right: 32px;
  line-height: 80px;
}
</style>