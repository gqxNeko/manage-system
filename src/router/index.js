import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("../pages/Home")
const Login = ()=>import("../pages/Login.vue")


const Message = () => import("@c/Message/Message")
const Self = () => import("@c/Manage/Person/Self")
const List = () => import("@c/Manage/List")
const Article = () => import("@c/Manage/Article/Article")
// const Remark = () => import("../views/Remark")
const UpLoad = () => import("@c/Manage/Upload/UpLoad")

Vue.use(VueRouter)

const routes = [
	{
		path: "",
		redirect: "/login",
	},
  {
    path:'/login',
    name:"Login",
    component:Login,
    meta:{
      title:'请登录'
    }
  },
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: {
			title: `你好啊-v-`,
		},
	},

	{
		path: "/message",
		name: "Message",
		component: Message,
		meta: {
			title: "消息中心",
		},
	},
	{
		path: "/list",
		component: List,
		children: [
			{
				path: "/",
				redirect: "/article",
			},
			{
				path: "self",
				name: "Self",
				component: Self,
				meta: {
					title: "个人中心",
				},
			},
			{
				path: "article",
				name: "Article",
				component: Article,
				meta: {
					title: "文章管理",
				},
			},
			{
				path: "upload",
				name: "Upload",
				component: UpLoad,
				meta: {
					title: "上传文章",
				},
			},
			// {
			//   path: 'remark',
			//   name: 'Remark',
			//   component: Remark,
			//   meta: {
			//     title: '评论管理'
			//   }
			// }
		],
	},
]

const router = new VueRouter({
	mode: "hash",
	base: process.env.BASE_URL,
	routes,
})

const OriginRouter = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return OriginRouter.call(this, location).catch((err) => err)
}
export default router
