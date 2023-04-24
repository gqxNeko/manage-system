<template>
  <div class="upload">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章名称" prop="articleName">
        <el-input v-model="ruleForm.articleName"></el-input>
      </el-form-item>

      <el-form-item label="文章内容" prop="desc">

          <el-card style="height: 400px;">
            <quill-editor
              v-model="ruleForm.desc"
              ref="myQuillEditor"
              style="height: 280px;"
              class="quill-editor"
              :options="editorOption"
            ></quill-editor>
          </el-card>

      </el-form-item>

      <el-form-item label="即时发送" prop="autoSend">
        <el-switch v-model="ruleForm.autoSend" active-color="#13ce68"></el-switch>
      </el-form-item>
      <el-form-item label="发送时间" :required="!ruleForm.autoSend">
        <el-col :span="11">
          <el-form-item prop="date1" :required="!ruleForm.autoSend">
            <el-date-picker
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
              :disabled="ruleForm.autoSend"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2" :required="!ruleForm.autoSend">
            <el-time-picker
              placeholder="选择时间"
              value-format="HH:mm:ss"
              v-model="ruleForm.date2"
              style="width: 100%;"
              :disabled="ruleForm.autoSend"
              clearable
            ></el-time-picker>
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

export default {
  name: "UpLoad",
  data() {
    return {
      editorOption: {
        placeholder: "请输入",
      },
      data:JSON.parse(localStorage.getItem('data')),
      ruleForm: {
        articleName: "",
        date1: "",
        date2: "",
        autoSend: false,
        desc: "",
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
        date1: [
          {
            trigger: "change",
          },
        ],
        date2: [
          {
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let This = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let time;
          if (this.ruleForm.autoSend) {
            time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            let hour = time.getHours();
            let minute = time.getMinutes();
            let second = time.getSeconds();
            let item = [month, hour, minute, second];
            for (let index in item) {
              if (item[index] < 10) {
                item[index] = "0" + item[index];
              }
            }
            [month, hour, minute, second] = item;
            time = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
          } else {
            time = this.ruleForm.date1 + " " + this.ruleForm.date2;
          }
          console.log(time);
          let obj = {
            date: time,
            articleName: this.ruleForm.articleName,
            content: this.ruleForm.desc,
            read: 0,
            remark: 0,
            maintain: 0,
            id:this.data.length+1,
          };

          // 将对象变成数组
          let arr = JSON.parse(localStorage.getItem("data"));
          let newObj = {};
          for (let index in obj) {
            newObj[index] = obj[index];
          }
          // 如何添加数据
          let curIndex = JSON.parse(localStorage.getItem("index"));
          if (curIndex.length > 0) {
            arr.splice(curIndex.length, 0, newObj);
          } else {
            arr.unshift(newObj);
          }
          localStorage.setItem("data", JSON.stringify(arr));
          this.$message({
            type: "success",
            message: "上传成功",
          });
          this.$router.push({
            name: "Article",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancle() {
      this.$router.push({
        name: "Article",
      });
    },
  },
  components:{
    // quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted(){
    addQuillTitle(); 

  }

};
</script>
<style>
  .upload .el-form-item{
    margin-bottom:32px;
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