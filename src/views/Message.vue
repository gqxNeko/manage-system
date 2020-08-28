<template>
  <div class="message">
    <h2>消息中心</h2>
  </div>
</template>

<script>
import ReplyItem from "../components/ReplyItem";
export default {
  name: "Message",

  data() {
    return {
      hello:true,
      message: [1, 2, 3, 4],
      child: `<i>你好</i>`,
      hello: {
        name: `<b>张三</b>`,
      },
    };
  },
  mounted() {
    this.message.splice(1, 1);
  },
  components: {
    ReplyItem,
  },
};
</script>

<style scoped>
</style>
