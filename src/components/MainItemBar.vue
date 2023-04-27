<template>
  <el-menu :default-active="this.$route.path" :router="true" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/home/index">{{home}}</el-menu-item>
    <el-menu-item index="/home/message">
      {{message}}
      <el-badge :value="1" :max="99" class="item"></el-badge>
    </el-menu-item>
    <el-menu-item index="/home/list">
      {{ system }}
      <!-- <a :href="getUrl()" target="_self">{{system}}</a> -->
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "MainItemBar",
  data() {
    return {
      home: "首页",
      message: "消息中心",
      system: "管理系统",
      // self: "个人中心",
    };
  },
  methods: {
    getUrl() {
      return "./#/list/article";
    },
  },
};
</script>
<style scoped>

.el-menu {
  /* position:fixed; */
  width:100%;
  /* z-index:999; */
  /* display: flex; */
  justify-content: flex-end;
  
}
.el-menu > div {
  margin-right: 40px;
}

/*
.el-menu-item.fontSize {
  font-size: 18px;
  font-weight: 700;
}

.el-menu-item.right {
  align-self: flex-end;
}*/
.el-menu-item {
  margin-right: 40px;
}
.el-menu--horizontal>.el-menu-item:hover{
  border-bottom:2px solid;
  border-bottom-color:#409EFF!important;
}
.right > i {
  margin-left: -5px;
}
.el-menu-item .el-badge.item {
  top: -12px;
  left: -7px;
}
</style>