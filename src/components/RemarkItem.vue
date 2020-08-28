<template>
<div class="remark-container">
  <div class="left">
    <el-avatar :size="50" :src="imgUrl"></el-avatar>
  </div>
  <div class="right">
    <div class="name">
      <slot name="nickName">Neko</slot>
    </div>
    <p>
      <slot name="remark-content">你好啊</slot>
    </p>
    <div class="remark-bottom">
      <span class='time'>
        <slot name="time">17:00:00</slot>
      </span>
      <span>
        <slot name="reply"> 回复</slot>
      </span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "RemarkItem",
  data() {
    return {
      imgUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.remark-container {
  display: flex;
  margin-top: 10px;

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

.remark-bottom {
  font-size: 12px;
  color: #999;
}

.time {
  margin-right: 20px;
}
</style>
