<template>
  <div class="item">
    <div class="header">
      <div>
        <slot name="title">v-model使用方法</slot>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <span>
          <slot name="date">2020年08月15日 09:58:00</slot>
        </span>
        <span>
          <i class="iconfont icon-ico_yueduliang"></i>
          <slot name="read">12</slot>
        </span>
        <span>
          <i class="iconfont icon-pinglun"></i>
          <slot name="remark">1</slot>
        </span>
        <span>
          <i class="iconfont icon-shoucang"></i>
          <slot name="maintain">1</slot>
        </span>
      </div>
      <div class="right">
        <slot name="methods">
          <el-button type="text" @click="handleView()">查看</el-button>
          <span class="line">|</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArticleItem",
  methods: {

  },
};
</script>

<style scoped>
@import url("//at.alicdn.com/t/font_1812798_c5qqvl1n43.css");

.item {
  padding: 16px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.header {
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  color: #4d4d4d;
}
.bottom {
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #999;
  justify-content: space-between;
}
.left {
  align-self: flex-start;
  line-height: 32px;
}
.left > span {
  margin-right: 1.5rem;
}
.left > span > i {
  margin-right: 3px;
}
.left > span > i.icon-pinglun {
  vertical-align: -1px;
}

.right {
  align-self: flex-end;
}
.right .line {
  display: inline-block;
  width: 20px;
  line-height: 32px;
  text-align: center;
}
</style>