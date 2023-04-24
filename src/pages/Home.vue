<template>
  <div class="home">
    <!-- <main-item-bar /> -->
    <detail></detail>
    <!-- <router-view id="show" v-wechat-title="$route.meta.title"></router-view> -->
  </div>

</template>
<script>
// import MainItemBar from '../components/MainItemBar.vue';
import Detail from "../components/ArticleContent"
export default {
  name: "Home",
  components: {
    // MainItemBar,
    Detail
  },
}
</script>
<style lang="scss">

</style>
