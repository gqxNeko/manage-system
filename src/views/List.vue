<template>
  <div class="list">
    <div class="left">
      <item></item>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Item from "../components/Item";
export default {
  name: "List",
  components: {
    Item,
  },
};
</script>
<style scoped>
.list{
  display: flex;
}
.list .left {
  border-right:1px solid;
  border-right-color:#e6e6e6;

  width: 20%;
  text-align: center;
}
.show{
  width:80%;
  padding:0 30px;
  padding-top:40px;
}

</style>
