<!--
 * @Date: 2021-04-08 14:07:01
 * @LastEditTime: 2021-04-08 15:42:42
-->
<template>
  <div id="app">
    <login v-if="!isLogin"></login>
    <main-item-bar v-if="isLogin" />
    <router-view id="show" v-if="isLogin" v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import MainItemBar from './components/MainItemBar'

export default {
  name: 'App',
  created() {
    if (!this.isLogin) {
      this.isLogin = false
    }
  },
  data() {
    return {
      isLogin: JSON.parse(localStorage.getItem('loginState')),
    }
  },
  methods: {},
  components: {
    MainItemBar,
    Login,
    // quillEditor,
  },
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
body,
html,
#app {
  height: 100%;
  width: 100%;
}
.el-menu {
  background: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom-color: transparent;
}
blockquote {
  padding: 0;
  margin: 0;
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

pre.ql-syntax {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
  border-radius: 4px;
  text-indent: 2em;
}

a {
  text-decoration: none;
}

#show {
  padding-top: 61px;
}
</style>
