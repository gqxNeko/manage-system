<!--
 * @Date: 2021-04-08 14:07:01
 * @LastEditTime: 2021-04-08 15:42:42
-->
<template>
  <div class="main-app">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'App',

  methods: {},
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }

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
  height: 100vh;
  width: 100%;
}
.main-app {
  height: 100vh;
  overflow: hidden;
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
