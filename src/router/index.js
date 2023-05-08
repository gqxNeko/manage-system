import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import '@assets/css/nprogress.css'

import { loginStatus } from '@utils/jwt'
import { getCookie } from '@utils/cookie'

const Home = () => import('../pages/Home')
const Login = () => import('../pages/Login.vue')

const Index = () => import('@components/Index/Index.vue')
const Message = () => import('@components/Message/Message')
const Self = () => import('@components/Manage/Person/Self')
const List = () => import('@components/Manage/List')
const Article = () => import('@components/Manage/Article/Article')
const UpLoad = () => import('@components/Manage/Upload/UpLoad')

const OriginRouter = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return OriginRouter.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '请登录'
    }
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect:'/home/index',
      },
      {
        path: 'index',
        name: 'Index',
        component: Index,
        meta: {
          title: '你好啊-v-',
          needLogin: true
        }
      },
      {
        path: 'message',
        name: 'Message',
        component: Message,
        meta: {
          title: '消息中心',
          needLogin: true
        }
      },
      {
        path: 'list',
        component: List,
        children: [
          {
            path: '',
            redirect: '/home/list/article'
          },
          {
            path: 'self',
            name: 'Self',
            component: Self,
            meta: {
              title: '个人中心',
              needLogin: true
            }
          },
          {
            path: 'article',
            name: 'Article',
            component: Article,
            meta: {
              title: '文章管理',
              needLogin: true
            }
          },
          {
            path: 'upload',
            name: 'Upload',
            component: UpLoad,
            meta: {
              title: '上传文章',
              needLogin: true
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta) {
    document.title = to.meta.title
  }
  const token = getCookie('token')
  const secret = getCookie('secret')
  if (to.path && to.path !== '/login' && !loginStatus(token, secret)) {
    next('/login')
  } else {
    next()
  }
})

// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
  NProgress.done()
})

export default router
