import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "@/utils/progress"
import { h, resolveComponent } from "vue"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../layout/index.vue"),
      children: [
        {
          path: "monitor",
          component: { render: () => h(resolveComponent("router-view")) },
          children: [
            {
              path: "tsServices",
              name: "tsServices",
              component: () => import("@/views/monitor/tsServices/index.vue")
            },
            {
              path: "quartzJob",
              name: "quartzJob",
              component: () => import("@/views/monitor/quartzJob/index.vue")
            }
          ]
        }
      ],
      meta: {
        title: "登录",
        menuStatus: false,
        ranks: 101
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/index.vue")
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  next()
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})

export default router
