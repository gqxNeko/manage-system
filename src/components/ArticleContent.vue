<template>
  <div class="homePage">
    <div v-for="(items,index) in pageNote" :key="items.id" class="article">
      <div class="article-item">
        <div>
          <h1 class="head">{{items.articleName}}</h1>
          <div class="name">作者：{{items.name}}</div>
          <div class="content" :class="pageNote[index].fold?'fold':'unfold'"
            v-html="items.content"></div>
          <div class="show" @click="changeShow(index)" v-if="isShow(index)">
            {{pageNote[index].fold?'展开':'收起'}}</div>
        </div>

        <div class="communicate">
          <div class="info">
            <div class="like" v-if="false">
              <i class="el-icon-star-on"></i>
              <span>赞</span>
              <span>2</span>
            </div>
            <div class="opinion">
              <i class="el-icon-chat-dot-round"></i>
              <span>评论</span>
              <span>{{0}}</span>
            </div>
            <div class="more" @click="readRemark(index)"
              v-if="!pageNote[index].show">全部评论</div>
            <div class="more2" @click="readRemark(index)" v-else>全部评论</div>
          </div>

          <div v-if="pageNote[index].show" class="show-area">
            <el-avatar :size="50" :src="imgUrl"></el-avatar>
            <el-input type="textarea" v-model="items.text" placeholder="请输入内容"
              :autosize="{minRows:2,maxRows:4}"></el-input>
            <el-button class="send" type="primary"
              @click="sendMessage(index)">发送内容</el-button>
          </div>
          <div>
            <div v-for="(newItems,newIndex) in user[userIndex+index]"
              :key="newItems.id">
              <remark-item>
                <div slot="nickName">{{name}}</div>
                <p slot="remark-content">
                  {{user[userIndex+index][newIndex].content}}</p>
                <span slot="time"
                  class="date">{{user[userIndex+index][newIndex].time}}</span>
                <span slot="reply" @click="remarkEvent()">回复</span>
              </remark-item>
              <reply-item v-if="false">
                <div slot="nickName">{{2}}</div>
                <p slot="reply-content">{{2}}</p>
                <span slot="date" class="date">{{3}}</span>
                <span slot="reply" @click="replyEvent()">回复</span>
              </reply-item>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import ReplyItem from './ReplyItem'
import RemarkItem from './RemarkItem'
export default {
  name: 'HomePage',
  created () {
    if (!this.message || !this.curIndex) {
      this.message = this.$store.state.data
      this.curIndex = []
    }

    if (!this.user) {
      this.user = []
    }
  },
  mounted () {
    if (!this.curIndex.length) {
      this.sortDate(this.message, 'date')
    }
    this.pageTotal = this.message.length
    this.getList(this.message, this.pageSize)
    let This = this
    this.message.map((i) => {
      i.fold = true
      i.show = false
      i.name = JSON.parse(localStorage.getItem('userInfo')).nickName
      return i
    })
  },
  updated () {
    this.userIndex = (this.currentPage - 1) * this.pageSize
    console.log(this.userIndex)
    localStorage.setItem('userInfo', JSON.stringify(this.user))
  },
  data () {
    return {
      //分页部分
      currentPage: 1,
      pageSize: 5,
      pageNote: [],
      pageAll: [],
      pageTotal: 0,
      userIndex: 0,

      //评论该部分
      views: '',
      user: JSON.parse(localStorage.getItem('userInfo')),
      currentName: '',
      currentTime: [],
      currentContent: [],
      name: JSON.parse(localStorage.getItem('userInfo')).nickName,

      //存储数据的部分
      message: JSON.parse(localStorage.getItem('data')),
      curIndex: JSON.parse(localStorage.getItem('index')),
      topIndex: JSON.parse(localStorage.getItem('top')),

      index: 0,
      aIndex: this.$route.query.index,
      agree: 0,
      remark: 0,
      imgUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },

  methods: {
    isShow (index) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      if (this.message[newIndex].content.length > 200) {
        return true
      } else {
        return false
      }
    },
    changeShow (index) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      this.message[newIndex].fold = !this.message[newIndex].fold
      this.getList(this.message, this.pageSize)
    },
    // isMore(index) {},
    getList (arr, size) {
      let newArr = []
      let pageNum = 0
      let limit = Math.ceil((arr.length / size) * 1.0)
      while (pageNum < limit) {
        newArr.push(
          arr.slice(pageNum * this.pageSize, (pageNum + 1) * this.pageSize)
        )
        pageNum++
      }

      this.pageNote = newArr[this.currentPage - 1]
      this.pageAll = newArr
    },
    sortDate (obj, key) {
      return obj.sort(function (a, b) {
        let [x, y] = [a[key], b[key]]
        return x > y ? -1 : x < y ? 1 : 0
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList(this.message, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pageNote = this.pageAll[val - 1]
    },
    readRemark (index) {
      let newIndex = (this.currentPage - 1) * this.pageSize + index
      this.message[newIndex].show = !this.message[newIndex].show
      this.getList(this.message, this.pageSize)
    },

    sendMessage (index) {
      this.clickIndex = index
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let item = [month, hour, minute, second]
      for (let index in item) {
        if (item[index] < 10) {
          item[index] = '0' + item[index]
        }
      }
      ;[month, hour, minute, second] = item
      date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      this.currentTime = date
      this.currentContent = this.pageNote[index].text
      this.pageNote[index].text = ''
      if (!this.currentContent) {
        return
      }
      let obj = {
        time: this.currentTime,
        content: this.currentContent,
      }
      let arr = JSON.parse(localStorage.getItem('userInfo'))
      if (arr.length == 0) {
        for (let ind in this.message) {
          arr[ind] = []
        }
      }

      //上传文章时更新arr长度
      let [arrLen, maxLen] = [arr.length, this.message.length]
      if (arrLen < maxLen) {
        for (let i = arrLen - 1; i < maxLen; i++) arr[i] = []
      }

      arr[this.userIndex + index].push(obj)

      this.user = arr
      localStorage.setItem('userInfo', JSON.stringify(this.user))
    },
    remarkEvent () {
      console.log('回复评论')
    },
    replyEvent () {
      console.log('回复消息')
    },
  },
  components: {
    RemarkItem,
    ReplyItem,
  },
}
</script>

<style scoped>
.homePage {
  padding: 80px 0 50px 0 !important;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  overflow: auto;
  /* background: url('../assets/img/bg.jpg') center center; */
  /* background: linear-gradient(to left, rgba(255, 255, 255, 0.932), #409eff); */
}

.article {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 600px;
  margin: 0 auto;
  background: white;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.3s ease-in;
}

.article:first-child {
  padding-top: 20px;
}

.article:last-child {
  margin-bottom: 0;
}

.article > .article-item {
  list-style: none;
}

.article:hover {
  box-shadow: 0 0 5px black;
}

.head {
  color: #494949;
  margin-bottom: 20px;
}

.name {
  margin-bottom: 10px;
  font-size: 14px;
}

.content {
  line-height: 32px;
  text-align: left;
  color: #111111;
  white-space: pre-line;
  /* 新布局 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content.fold {
  -webkit-line-clamp: 3;
}

.content.unfold {
  -webkit-line-clamp: 100;
}

.block {
  margin: 0 auto;
  text-align: center;
}

.show {
  color: #409eff;
  cursor: pointer;
  text-align: right;
}

.communicate {
  margin-top: 20px;
  line-height: 28px;
  border-top: 2px solid;
  border-top-color: #e5e9ef;
  font-size: 14px;
  cursor: pointer;
}

.loginIn {
  margin-top: 20px;
}

.info {
  margin-top: 20px;
  display: flex;
}

.more,
.more2 {
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}

.more {
  border-bottom: 2px solid black;
}

.more2,
.more:hover,
.more2:hover {
  border-bottom: 2px solid;
  color: #409eff;
}

.el-icon-star-on,
.el-icon-chat-dot-round {
  margin-right: 3px;
  vertical-align: middle;
}

.like,
.opinion,
.more,
.more2 {
  margin-right: 20px;
}

.el-icon-star-on {
  color: #606266;
}

.el-icon-star-on:hover,
.el-icon-star-on.active {
  color: #f56c6c;
}

.el-input {
  width: 180px;
}

.form-inline {
  margin-bottom: 60px;
}

.form2-inline {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-textarea {
  width: 360px;
}

.el-button {
  font-size: 14px;
  padding: 10px;
}

.el-button.send {
  height: 50px;
}

.bottom-remark {
  text-align: left;
}

.bottom-remark > .el-avatar {
  margin-right: 20px;
}

.bottom-remark .remark-name,
.bottom-remark .remark-date {
  font-size: 12px;
  color: #999;
  line-height: 20px;
}

.right {
  font-size: 14px;
}

.reply-container:last-child {
  border-bottom: 1px solid;
  border-bottom-color: #ccc;
}

.show-area {
  display: flex;
  margin: 20px 0 40px 0;
}
</style><style>
.show-area .el-avatar,
.show-area .el-textarea {
  margin-right: 20px;
}
</style>
