<template>
  <div class="home">
    <main-item-bar></main-item-bar>
    <router-view></router-view>
  </div>

</template>
<script>
import ArticleContent from "../components/ArticleContent"
import MainItemBar from "../components/MainItemBar.vue";
export default {
  name: "Home",
  components: {
    ArticleContent,
    MainItemBar
  },
}
</script>
<style lang="scss">

</style>
