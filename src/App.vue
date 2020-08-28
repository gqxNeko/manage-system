<template>
  <div id="app">
    <login v-if="!isLogin"></login>
    <main-item-bar v-if="isLogin" />
    <router-view id="show" v-if="isLogin" v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import Login from "./components/Login";
import MainItemBar from "./components/MainItemBar";

// import {
//   Quill,
//   quillEditor
// } from "vue-quill-editor";

// // 自定义字体大小
// let Size = Quill.import("attributors/style/size");
// Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
// Quill.register(Size, true);

// // 自定义字体类型
// let fonts = [
//   "SimSun",
//   "SimHei",
//   "Microsoft-YaHei",
//   "KaiTi",
//   "FangSong",
//   "Arial",
//   "Times-New-Roman",
//   "sans-serif",
//   "宋体",
//   "黑体",
// ];
// let Font = Quill.import("formats/font");
// Font.whitelist = fonts;
// Quill.register(Font, true);

export default {
  name: "App",
  created() {
    if (!this.isLogin) {
      this.isLogin = false;
    }
  },
  data() {
    return {
      isLogin: JSON.parse(localStorage.getItem('loginState')),
    };
  },
  methods: {},
  components: {
    MainItemBar,
    Login,
    // quillEditor,
  },
};
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
