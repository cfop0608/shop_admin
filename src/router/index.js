import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
// 导入Home组件
import Home from '@/components/Home'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
// 给router对象注册一个导航守卫
// 将来所有的导航（路由发生了跳转）都要经过beforeEach
// to : 去哪儿
// from: 从哪儿
// next : 是否放行  next() 直接放行  next('/login') 强制跳转login页面
router.beforeEach((to, from, next) => {
  // console.log('hehe')
  // console.log(to, from)
  // 如果要去login页直接放行
  if (to.path === '/login') {
    // 直接放行
    next()
  } else {
    // 如果不是login页，判断是否有token，如果有 直接放行，如果没有， 登录页
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
