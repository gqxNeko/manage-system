
 <!-- 组件代码如下 -->
<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  // export default {
  //   name: 'MarkDown',
  //   data() {
  //     return {
  //       editor: null
  //     }
  //   },
  //   props: {
  //     defaultMsg: {
  //       type: String
  //     },
  //     config: {
  //       type: Object
  //     }
  //   },
  //   mounted() {
  //     const _this = this;
  //     this.editor = MarkDown.getEditor('editor', this.config); // 初始化MarkDown
  //     this.editor.addListener("ready", function () {
  //       _this.editor.setContent(_this.defaultMsg) // 确保MarkDown加载完成后，放入内容。
  //     });
  //   },
  //   methods: {
  //     getMarkDownContent() { // 获取内容方法
  //       return this.editor.getContent()
  //     }
  //   },
  //   destroyed() {
  //     this.editor.destroy()
  //   }
  // }

</script>



<style scoped>
 
</style>