<template>
  <div class="upload">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="文章名称" prop="articleName">
        <el-input v-model="ruleForm.articleName"></el-input>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">

        <el-card style="height: 400px;">
          <quill-editor v-model="ruleForm.content" ref="myQuillEditor"
            style="height: 280px;" class="quill-editor"
            :options="editorOption"></quill-editor>
        </el-card>

      </el-form-item>

      <el-form-item label="即时发送" prop="autoSend">
        <el-switch v-model="ruleForm.autoSend"
          active-color="#13ce68"></el-switch>
      </el-form-item>
      <el-form-item label="发送时间" :required="!ruleForm.autoSend">
        <el-col :span="11">
          <el-form-item prop="publishTime" :required="!ruleForm.autoSend">
            <el-date-picker type="datetime" placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.publishTime" style="width: 100%;"
              :disabled="ruleForm.autoSend" clearable></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 尾部 -->
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')">上传</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addQuillTitle
} from '@assets/js/quill-title.js'
import { addArticle } from '@api/api.js'
export default {
  name: "UpLoad",
  data () {
    return {
      editorOption: {
        placeholder: "请输入",
      },
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
      // data: JSON.parse(localStorage.getItem('data')),
      ruleForm: {
        articleName: "",
        publishTime: "",
        autoSend: false,
        content: "",
      },
      rules: {
        articleName: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        publishTime: [
          {
            trigger: "change",
          },
        ],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm (formName) {
      let target = JSON.parse(JSON.stringify(this.ruleForm))
      if (target.autoSend) {

        // debugger
        const time = new Date().toLocaleString().replace(/\//g, '-')
        const left = time.split(' ')[0]
        const right = time.split(' ')[1]
        const YEAR = left.split('-')[0]
        let month = left.split('-')[1]
        let day = left.split('-')[2]
        if (month.length == 1) {
          month = `0${month}`
        }
        if (day.length == 1) {
          day = `0${day}`
        }
        target.publishTime = `${YEAR}-${month}-${day} ${right}`
      }
      target.authorId = this.userInfo.id || 1
      delete target.autoSend
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addArticle(target).then(res => {
            if (res?.data?.code == 200) {

            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    cancle () {
      this.$router.push({
        name: "Article",
      });
    },
  },
  components: {
  },
  // computed: {
  //   editor () {
  //     return this.$refs.myQuillEditor.quill;
  //   },
  // },
  mounted () {
    addQuillTitle();
  }

};
</script>
<style>
.upload .el-form-item {
  margin-bottom: 32px;
}
</style>
<style scoped>
.line {
  text-align: center;
}

.quill-editor {
  line-height: normal;
}
</style>