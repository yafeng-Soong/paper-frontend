import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/test',
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/Test.vue')
      },
      {
        path: '/helloWorld',
        name: 'HelloWorld',
        component: () => import('../components/HelloWorld.vue')
      },
      {
        path: '/modifyInfo',
        name: 'ModifyInfo',
        component: () => import('../views/user/ModifyInfo.vue')
      },
      {
        path: '/submit',
        name: 'Submit',
        component: () => import('../views/paper/Submit.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
