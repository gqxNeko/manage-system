<template>
  <div class="reply-container">
    <div class="left">
      <el-avatar :size="30" :src="imgUrl"></el-avatar>
    </div>
    <div class="right">
      <div class="name">
        <slot name="nickName">Neko</slot>
      </div>
      <p>
        <slot name="reply-content">你好啊</slot>
      </p>
      <div class="reply-bottom">
        <span class="time">
          <slot name="time">17:00:00</slot>
        </span>
        <span>
          <slot name="reply">回复</slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyItem",
  props: {
    test: true,
  },
  data() {
    return {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.reply-container {
  padding-top: 5px;
  margin-left: 70px;
  display: flex;
}

.left {
  margin-right: 20px;
}

.right {
  text-align: left;
  padding: 6px 0;
}

.name {
  font-size: 12px;
  color: #999;
  line-height: 18px;
  padding-bottom: 4px;
}

p {
  line-height: 22px;
  padding: 2px 0;
}

.reply-bottom {
  font-size: 12px;
  color: #999;
}

.time {
  margin-right: 20px;
}
</style>
