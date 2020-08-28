const path = require("path");
const resolve = function (dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "././" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: true, // 是否在构建生产包时生成sourceMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
    config.optimization.runtimeChunk("single");
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    // proxy: {
    //   "/api": {
    //     /* 目标代理服务器地址 */
    //     target: "http://m260048y71.zicp.vip", //
    //     // target: "http://192.168.1.102:8888", //
    //     /* 允许跨域 */
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // }
  }
};