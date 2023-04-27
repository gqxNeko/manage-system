<template>
    <el-menu  :default-active="this.$route.path" :router="true" class="el-menu-vertical-demo">
      <el-menu-item index="/home/list/self">
        <i class="el-icon-user"></i>
        <span slot="title">{{self}}</span>
      </el-menu-item>
      <el-menu-item index="/home/list/article">
        <i class="el-icon-reading"></i>
        <span slot="title">{{article}}</span>
      </el-menu-item>
      <el-menu-item index="/home/list/upload">
        <i class="el-icon-upload"></i>
        <span slot="title">{{upload}}</span>
      </el-menu-item>
      
    </el-menu>

</template>
<script>
export default {
  name: "Item",
  data() {
    return {
      self:"个人中心",
      article: "文章管理",
      // remark: "评论管理",
      upload: "上传文章",
    };
  },
};
</script>
<style scoped>
.el-menu{
  border-right-color:transparent;
}
</style>