import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueWechatTitle from 'vue-wechat-title'

import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor)


Vue.use(VueWechatTitle)



Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});

import App from './App.vue'
import router from './router'
import store from './store'





Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})


//数据库测试
// let request = indexedDB.open('blog', 1);
// let db;
// //更新版本
// request.onupgradeneeded = function (event) {
//   db = event.target.result;
//   console.log('更新数据库');
//   let objectStore;
//   if (!db.objectStoreNames.contains('blog')) {
//     objectStore = db.createObjectStore('blog', {
//       keyPath: 'id'
//     });
//   }
//   objectStore.createIndex('data', 'data', {
//     unique: true
//   });
//   objectStore.createIndex('name', 'nickName', {
//     unique: true
//   });
//   objectStore.createIndex('top', 'topArr', {
//     unique: false
//   });
//   objectStore.createIndex('time', 'currentTime', {
//     unique: true
//   });
// }

// //打开数据库失败
// request.onerror = function () {
//   console.log("打开失败");
// }
// //打开数据库成功
// request.onsuccess = function () {
//   db = request.result;
//   console.log("打开成功");

//   //新增数据
//   function add() {
//     console.log('add函数');
//     let request = db.transaction(['blog'], 'readwrite')
//       .objectStore('blog')
//       .add({
//         id: 1,
//         name: '九州白',
//         email: '1741493004@qq.com'
//       });
//     request.onerror = function (event) {
//       console.log('新增失败');
//     }
//     request.onsuccess = function (event) {
//       console.log('新增成功');
//     }
//   }
//   add();
//   console.log("-----");
//   //读取数据
//   function read() {
//     let request = db.transaction(['blog'])
//       .objectStore('blog')
//       .get(1);
//     request.onerror = function () {
//       console.log('获取失败');

//     }
//     request.onsuccess = function () {
//       if (request.result) {
//         console.log("name:" + request.result.name);
//         console.log("email:" + request.result.email);
//       } else {
//         console.log('获取失败');
//       }
//     }
//   }
//   read();

//   console.log("-----");
//   //更新数据
//   function update() {
//     let request = db.transaction(['blog'], 'readwrite')
//       .objectStore('blog')
//       .put({
//         id: 1,
//         name: 'Neko',
//         email: '1741493004@qq.com'
//       });
//     request.onsuccess = function (event) {
//       if (request.result.name == "Neko") {
//         console.log("更新成功");
//       } else {
//         console.log('更新失败');
//       }
//     };
//     request.onerror = function (event) {
//       console.log('更新失败');
//     }
//   }
//   update();


//   //遍历操作
//   function readAll() {
//     let objectStore = db.transaction(['blog'])
//       .objectStore('blog');
//       objectStore.openCursor().onsuccess  = function(event){

//         let cursor = event.target.result;
//         if(cursor){
//           console.log('key:' + cursor.key);
//           console.log('name:'+cursor.value.name);
//           cursor.continue();
//         }else{
//           console.log("遍历完成");
//         }
//       }

//   }
//   readAll()

//   //删除操作
//   function remove(){
//     let request = db.transaction(['blog'],'readwrite')
//     .objectStore('blog')
//     .delete(1);
//     request.onsuccess = function(event){
//       console.log('删除成功');

//     }
//   }
//   remove()
 
// }