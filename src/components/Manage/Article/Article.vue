<template>
  <div class="article">
    <div class="search">
      <el-input
        size="small"
        v-model="search"
        placeholder="请输入关键词搜索"
        prefix-icon="el-icon-search"
        clearable
      ></el-input>
    </div>

    <article-item
      v-for="(items,i) in pageNote.filter(data=>!search||
      data.articleName.toLowerCase().includes(search.toLowerCase()))"
      :key="items.id"
    >
      <div slot="title" class="title">
        <span v-if="show(i,items)" class="tag">置顶</span>
        {{items.articleName}}
      </div>
      <span slot="date">{{items.date}}</span>
      <span slot="read">{{items.read}}</span>
      <span slot="remark">{{items.remark}}</span>
      <span slot="maintain">{{items.maintain}}</span>
      <el-button type="text" @click="handleEdit(i)" slot="methods">
        <slot name="edit">编辑</slot>
      </el-button>

      <span class="line" slot="methods">|</span>
      <el-button type="text" v-if="top(i)" @click="handleToTop(i)" slot="methods">置顶</el-button>
      <el-button type="text" v-if="!top(i)" @click="cancleToTop(i)" slot="methods">取消置顶</el-button>
      <span class="line" slot="methods">|</span>
      <el-button type="text" @click="deleteRow(i,pageNote)" slot="methods">
        <slot name="delete">删除</slot>
      </el-button>
    </article-item>

    <el-dialog :visible.sync="dialogFormVisible" slot="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:100%;margin:0 auto"
      >
        <el-form-item label="文章名称" prop="articleName">
          <el-input v-model="ruleForm.articleName"></el-input>
        </el-form-item>

        <el-form-item label="文章内容" prop="desc">
          <el-card style="height: 460px;">
            <quill-editor
              class="quill-editor"
              v-model="ruleForm.desc"
              ref="myQuillEditor"
              style="height: 300px;"
              :options="editorOption"
            ></quill-editor>
          </el-card>
          <!-- <el-input type="textarea" :autosize="{ minRows:4, maxRows: 8}" v-model="ruleForm.desc"></el-input>-->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--   <el-dialog :visible.sync="dialogVisible" width="20%">
      <span>确定{{toTop}}该文章？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
    -->

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "Article",
  data() {
    return {
      editorOption: {},
      currentPage: 1,
      pageSize: 5,
      pageNote: [],
      pageAll: [],
      pageTotal: 0,
      toTop: "置顶",
      article: JSON.parse(localStorage.getItem("data")),
      isShow: true,
      curIndex: JSON.parse(localStorage.getItem("index")),
      topIndex: JSON.parse(localStorage.getItem("top")),

      id: "",
      search: "",
      dialogVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        articleName: "",
        desc: "",
      },
      rules: {
        articleName: [
          {
            required: true,
            message: "请输入文章名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "请填写内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    getList(arr, size) {
      this.pageTotal = arr.length;
      let newArr = [];
      let count = Math.ceil((arr.length / size) * 1.0);
      let pageNum = 0;
      while (pageNum < count) {
        newArr.push(arr.slice(size * pageNum, size * (pageNum + 1)));
        pageNum++;
      }
      if (this.currentPage > 0) {
        this.pageNote = newArr[this.currentPage - 1];
      }

      this.pageAll = newArr;
    },

    sortDate(obj, key) {
      return obj.sort(function (a, b) {
        let [x, y] = [a[key], b[key]];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    },

    // 显示置顶图标
    show(index, item) {
      let This = this;
      let aIndex = (this.currentPage - 1) * this.pageSize + index;
      //curIndex长度不为1，说明存在置顶元素
      if (this.curIndex.indexOf(aIndex) != -1) {
        return true;
      } else {
        return false;
      }
    },

    //置顶还是取消置顶
    top(index) {
      let aIndex = (this.currentPage - 1) * this.pageSize + index;
      //curIndex长度为1时，没有置顶元素
      if (this.curIndex.length == 0 || this.curIndex.indexOf(aIndex) == -1) {
        return true;
      } else {
        return false;
      }
    },

    handleEdit(index) {
      this.dialogFormVisible = true;
      if (this.pageNote) {
        this.ruleForm.articleName = this.pageNote[index].articleName;
        this.ruleForm.name = this.pageNote[index].name;
        this.ruleForm.desc = this.pageNote[index].content;
      }
      this.$router.replace({
        query: {
          index: index,
        },
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let curIndex = this.$route.query.index;
          let obj = {
            articleName: this.ruleForm.articleName,
            name: this.ruleForm.name,
            content: this.ruleForm.desc,
            date: this.pageNote[curIndex].date,
            read: this.pageNote[curIndex].read,
            remark: this.pageNote[curIndex].remark,
            maintain: this.pageNote[curIndex].maintain,
            id: this.pageNote[curIndex].id,
          };
          console.log(this.ruleForm.desc);

          // 将对象变成数组
          // JSON.parse(localStorage.getItem("data"));

          let newObj = {};
          for (let index in obj) {
            newObj[index] = obj[index];
          }

          this.pageNote.splice(curIndex, 1, newObj);
          this.article.splice(
            (this.currentPage - 1) * this.pageSize + curIndex,
            1,
            newObj
          );
          localStorage.setItem("data", JSON.stringify(this.article));
          // let newArr = ["JDG", "TES", "IG", "FPX", "V5", "LGD", "WE"];
          // newArr.splice(1, 1, "ig")
          // console.log(newArr);

          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          console.log("修改失败");
          return false;
        }
      });
    },

    handleToTop(index) {
      //互换位置

      let len = this.curIndex.length;
      let artLen = this.article.length;
      //整篇文章的索引
      let aIndex = (this.currentPage - 1) * this.pageSize + index;

      [this.article[len], this.article[aIndex]] = [
        this.article[aIndex],
        this.article[len],
      ];

      this.curIndex.push(len);
      //len实时更新
      len = this.curIndex.length;

      this.topIndex.push(aIndex);
      //置顶部分
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (this.article[i].date >= this.article[j].date) {
            [this.article[i], this.article[j]] = [
              this.article[j],
              this.article[i],
            ];
          }
        }
      }

      //未置顶部分
      for (let m = len; m < artLen; m++) {
        for (let n = len; n < artLen; n++) {
          if (this.article[m].date >= this.article[n].date) {
            [this.article[m], this.article[n]] = [
              this.article[n],
              this.article[m],
            ];
          }
        }
      }
      this.getList(this.article, this.pageSize);
    },
    cancleToTop(index) {
      //互换位置
      let len = this.curIndex.length;
      let limitLen = this.article.length;
      let curPageNum = (this.currentPage - 1) * this.pageSize;
      let aIndex = curPageNum + index;
      let arr = [];
      for (let props in this.article) {
        arr.push(this.article[props]);
      }
      this.topIndex.splice(aIndex, 1);
      //删除当前行
      this.article.splice(aIndex, 1);
      this.curIndex.splice(len - 1);
      //将当前行的数据放到尾部
      this.article.push(arr[aIndex]);
      //未置顶部分进行排序

      len = this.curIndex.length;
      for (let i = len; i < limitLen; i++) {
        for (let j = len; j < limitLen; j++) {
          if (this.article[i].date >= this.article[j].date) {
            [this.article[i], this.article[j]] = [
              this.article[j],
              this.article[i],
            ];
          }
        }
      }
      this.getList(this.article, this.pageSize);
    },
    deleteRow(index, rows) {
      let This = this;
      this.$confirm("是否删除文章?", "提示", {
        confirmButtonText: "是的",
        cancelButtonText: "不了",
        type: "warning",
      })
        .then(() => {
          if (This.currentPage > 0) {
            let aIndex = (This.currentPage - 1) * This.pageSize + index;

            rows.splice(index, 1);
            This.article.splice(aIndex, 1);

            //如果当前删除的是带置顶的元素
            if (
              This.curIndex.length != 0 &&
              This.curIndex.indexOf(aIndex) != -1
            ) {
              let len = This.curIndex.length;
              This.curIndex.splice(len - 1);
              // console.log("当前curIndex值：", This.curIndex);
              // console.log("当前文章索引", aIndex);
            }
            //如果删除的元素为该列最后一个
            if (rows.length == 0) {
              if (This.currentPage > 0) {
                This.currentPage--;
              }
            }
          }
          localStorage.setItem("data", JSON.stringify(rows));
          This.getList(This.article, This.pageSize);

          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      //直接将val传进去，不需要改变this.pageSize的值
      this.getList(this.article, val);
    },
    handleCurrentChange(val) {
      this.pageNote = this.pageAll[val - 1];
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    if (!this.article || !this.curIndex || !this.topIndex) {
      this.article = this.$store.state.data;
      this.curIndex = [];
      this.topIndex = [];
    }
  },
  mounted() {
    if (!this.curIndex.length) {
      this.sortDate(this.article, "date");
    }
    this.getList(this.article, this.pageSize);
  },
  updated() {
    localStorage.setItem("data", JSON.stringify(this.article));
    localStorage.setItem("index", JSON.stringify(this.curIndex));
    localStorage.setItem("top", JSON.stringify(this.topIndex));
  },

  components: {
    ArticleItem,
    quillEditor,
  },
};
</script>

<style scoped>
.search {
  width: 300px;
  margin: 0 auto;
  display: flex;
}

.click {
  margin-left: 40px;
}

.tag {
  display: inline-block;
  font-size: 12px;
  padding: 0 8px;
  height: 24px;
  line-height: 22px;
  margin-right: 12px;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  vertical-align: middle;
}

.line {
  text-align: center;
}

.dialog-footer {
  text-align: center;
}

.dialog-footer .el-button {
  margin-right: 20px;
}

.block {
  padding-top: 20px;
  margin: 0 auto;
  text-align: center;
}

.quill-editor {
  line-height: normal;
}
</style>
