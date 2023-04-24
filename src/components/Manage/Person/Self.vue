<template>
  <div class="self">
    <el-form
      status-icon
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      style=" width: 30%;
              margin: 0 auto;"
    >
      <div class="block">
        <span class="changeAvatar">{{header}}</span>
        <el-upload
          class="avatar-uploader"
          :on-preview="handlePreview"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form-item label="性别">
        <el-radio v-model="radio" label="male">男</el-radio>
        <el-radio v-model="radio" label="female">女</el-radio>
      </el-form-item>

      <el-form-item label="昵称" prop="name" required>
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email" required>
        <el-input v-model="form.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" required>
        <el-input v-model.number="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-input v-model="form.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password2" show-password clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        <el-button @click="reset('form')">再想想</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Self",
  data() {
    return {
      self: "个人中心",
      imageUrl: localStorage.getItem("avatar"),
      header: "头像",
      id: "",
      fit: "fill",
      radio: "male",
      form: {
        name: "",
        sex: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
      },
      rules: {
        name: [
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
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "请输入6至16位字符",
            trigger: "blur",
          },
        ],
        password2: [{}, {}],
      },
    };
  },
  created() {
    console.log(typeof this.imageUrl);
    if (!this.imageUrl) {
      this.imageUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
  },
  mounted() {},
  updated() {
    localStorage.setItem("avatar", this.imageUrl);
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password == this.form.password2) {
            this.$message({
              type: "success",
              message: "修改完成",
            });
          } else {
            this.$message.error("请输入相同的密码");
            return false;
          }
        } else {
          this.$alert("请注意输入正确的信息");
          console.log("请填入相应的信息");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
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