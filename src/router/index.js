import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('../views/Home')
const Message = () => import('../views/Message')
const Self = () => import('../views/Self')

const List = () => import('../views/List')

const Article = () => import('../views/Article')
const Remark = () => import('../views/Remark')
const UpLoad = () => import('../views/UpLoad')






Vue.use(VueRouter)





const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: `你好啊-v-`
    }
  }, 

  
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '消息中心'
    }
  },
  {
    path: '/list',
    component: List,
    children: [{
        path: '/',
        redirect: '/article',
      },
      {
        path: 'self',
        name: 'Self',
        component: Self,
        meta: {
          title: '个人中心'
        }
      },
      {
        path: 'article',
        name: 'Article',
        component: Article,
        meta: {
          title: '文章管理'
        }
      },
      {
        path: 'upload',
        name: 'Upload',
        component: UpLoad,
        meta: {
          title: '上传文章'
        }
      },
      {
        path: 'remark',
        name: 'Remark',
        component: Remark,
        meta: {
          title: '评论管理'
        }
      }

    ]

  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const OriginRouter = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
 return  OriginRouter.call(this,location).catch(err=>err);
}
export default router