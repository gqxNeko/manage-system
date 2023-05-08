<template>
  <div class="article">
    <div class="search">
      <el-input size="small" v-model="key" @keyup.native="handleSearch"
        placeholder="请输入关键词搜索" prefix-icon="el-icon-search" @clear="handleClear"
        clearable></el-input>
    </div>

    <article-item v-for="items in pageNote" :key="items.articleId">
      <div slot="title" class="title">
        <span v-if="showTop(items)" class="tag">置顶</span>
        {{items.articleName}}
      </div>
      <span
        slot="date">{{items.publishTime.split('.')[0].replace('T',' ')}}</span>
      <span slot="read">{{items.readCount}}</span>
      <span slot="remark">{{items.remark}}</span>
      <span slot="maintain">{{items.maintain}}</span>
      <el-button type="text" @click="handleEdit(items)" slot="methods">
        <slot name="edit">编辑</slot>
      </el-button>

      <span class="line" slot="methods">|</span>
      <el-button type="text" v-if="!showTop(items)"
        @click="handleToTop(items.articleId)" slot="methods">置顶</el-button>
      <el-button type="text" v-if="showTop(items)" @click="cancleToTop()"
        slot="methods">取消置顶</el-button>
      <span class="line" slot="methods">|</span>
      <el-button type="text" @click="deleteRow(items.articleId)" slot="methods">
        <slot name="delete">删除</slot>
      </el-button>
    </article-item>

    <el-dialog :visible.sync="dialogFormVisible" slot="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
        label-width="100px" class="demo-ruleForm"
        style="width:100%;margin:0 auto">
        <el-form-item label="文章名称" prop="articleName">
          <el-input v-model="ruleForm.articleName"></el-input>
        </el-form-item>

        <el-form-item label="文章内容" prop="desc">
          <el-card style="height: 460px;">
            <quill-editor class="quill-editor" v-model="ruleForm.content"
              ref="myQuillEditor" style="height: 300px;"
              :options="editorOption"></quill-editor>
          </el-card>
          <!-- <el-input type="textarea" :autosize="{ minRows:4, maxRows: 8}" v-model="ruleForm.desc"></el-input>-->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
          @click.native.prevent="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5,10,15,20]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import { quillEditor } from "vue-quill-editor";
import { getArticleList, updateTop, deleteArticle, updateArticle } from "../../../api/api";
export default {
  name: "Article",
  data () {
    return {
      timer: null,
      editorOption: {},
      currentPage: 1,
      pageSize: 5,
      pageNote: [],
      pageAll: [],
      pageTotal: 0,
      toTop: "置顶",
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      // article: JSON.parse(localStorage.getItem("data")),
      isShow: true,
      curIndex: JSON.parse(localStorage.getItem("index")),
      topIndex: JSON.parse(localStorage.getItem("top")),

      id: "",
      key: "",
      dialogVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        articleName: "",
        content: "",
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
        content: [
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
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
  },

  created () {
    this.init()
  },
  methods: {
    handleClear () {
      this.handleSearch()
    },
    handleSearch () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.getList({ pageSize: this.pageSize, offset: (this.currentPage - 1) * this.pageSize })
      }, 500);

    },
    init () {
      getArticleList({ pageSize: this.pageSize, offset: 0, id: this.userInfo.id }).then(res => {
        if (res?.data?.code == 200) {
          this.pageNote = res.data.data.data
          this.pageTotal = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    // 显示置顶图标
    showTop (item) {
      if (item.articleId == this.userInfo.topId) {
        return true;
      } else {
        return false;
      }
    },

    handleEdit (obj) {
      this.dialogFormVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(obj))
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateArticle({
            articleName: this.ruleForm.articleName, content: this.ruleForm.content,
            id: this.ruleForm.articleId
          }).then(res => {
            if (res?.data?.code == 200) {
              this.$message.success(res.data.msg);
              this.init()
            } else {
              this.$message.error(res.data.msg);
            }
            this.dialogFormVisible = false;
          })
        }
      });
    },

    handleToTop (id) {
      updateTop({ articleId: id, id: this.userInfo.id }).then(res => {
        if (res?.data?.code == 200) {
          this.$message.success(res.data.msg)
          this.userInfo.topId = id
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        } else {
          if (res?.data?.code == 200) {
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    cancleToTop () {
      updateTop({ articleId: 0, id: this.userInfo.id }).then(res => {
        if (res?.data?.code == 200) {
          this.$message.success(res.data.msg)
          this.userInfo.topId = 0
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        } else {
          if (res?.data?.code == 200) {
            this.$message.error(res.data.msg)
          }
        }
      })

    },
    deleteRow (id) {
      deleteArticle({ id }).then(res => {
        if (res?.data?.code == 200) {
          this.$message.success(res.data.msg)
          this.init()
          if (id == this.userInfo.topId) {
            this.userInfo.topId = 0
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // deleteRow (index, rows) {
    //   let This = this;
    //   this.$confirm("是否删除文章?", "提示", {
    //     confirmButtonText: "是的",
    //     cancelButtonText: "不了",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       if (This.currentPage > 0) {
    //         let aIndex = (This.currentPage - 1) * This.pageSize + index;

    //         rows.splice(index, 1);
    //         This.article.splice(aIndex, 1);

    //         //如果当前删除的是带置顶的元素
    //         if (
    //           This.curIndex.length != 0 &&
    //           This.curIndex.indexOf(aIndex) != -1
    //         ) {
    //           let len = This.curIndex.length;
    //           This.curIndex.splice(len - 1);
    //           // console.log("当前curIndex值：", This.curIndex);
    //           // console.log("当前文章索引", aIndex);
    //         }
    //         //如果删除的元素为该列最后一个
    //         if (rows.length == 0) {
    //           if (This.currentPage > 0) {
    //             This.currentPage--;
    //           }
    //         }
    //       }
    //       localStorage.setItem("data", JSON.stringify(rows));
    //       This.getList(This.article, This.pageSize);

    //       this.$message({
    //         type: "success",
    //         message: "删除成功",
    //       });
    //     })
    //     .catch(() => {
    //       console.log("取消删除");
    //     });
    // },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getList({ pageSize: val, offset: (this.currentPage - 1) * val })
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getList({ pageSize: this.pageSize, offset: (val - 1) * this.pageSize })
    },
    getList ({ pageSize, offset }) {
      getArticleList({ pageSize, offset, id: this.userInfo.id, key: this.key ? this.key : null }).then(res => {
        if (res?.data?.code == 200) {
          this.pageNote = res.data.data.data
          this.pageTotal = res.data.data.total
        } else {
          this.$message.error('列表获取失败')
        }
      })

    }
  },
  components: {
    ArticleItem,
    quillEditor,
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 300px;
  margin: 0 auto;
  display: flex;
}

.click {
  margin-left: 40px;
}
.title {
  cursor: pointer;
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
