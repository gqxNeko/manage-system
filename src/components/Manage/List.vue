<template>
  <div class="list">
    <div class="left">
      <list-item></list-item>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ListItem from "./ListItem";
export default {
  name: "List",
  components: {
    ListItem,
  },
};
</script>
<style scoped>
.list {
  display: flex;
}
.list .left {
  border-right: 1px solid;
  border-right-color: #e6e6e6;
  text-align: center;
}
.show {
  width: 80%;
  padding: 0 30px;
  padding-top: 40px;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 64px);
}
</style>
