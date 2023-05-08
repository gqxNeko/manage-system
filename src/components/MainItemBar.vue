<template>
  <el-menu :default-active="defaultActive" :router="true" class="el-menu-demo"
    mode="horizontal" @select="handleSelect($event)">
    <el-menu-item index="/home/index">{{home}}</el-menu-item>
    <el-menu-item index="/home/message">
      {{message}}
      <el-badge :value="1" :max="99" class="item"></el-badge>
    </el-menu-item>
    <el-menu-item index="/home/list">
      {{ system }}
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "MainItemBar",
  data () {
    return {
      home: "首页",
      message: "消息中心",
      system: "管理系统",
      defaultActive: '/home/index'
    };
  },
  created(){
    this.handleSelect(this.$route.path)
  },
  methods: {
    handleSelect (e) {
      if (e.indexOf('/home/list') !== -1) {
        this.defaultActive = '/home/list'
      }else{
        this.defaultActive = e
      }
    }
  },
};
</script>
<style scoped>
.el-menu {
  width: 100%;
  justify-content: flex-end;
}
.el-menu > div {
  margin-right: 40px;
}

.el-menu-item {
  margin-right: 40px;
}
.right > i {
  margin-left: -5px;
}
.el-menu-item .el-badge.item {
  top: -12px;
  left: -7px;
}
</style>