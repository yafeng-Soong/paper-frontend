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
      },
      {
        path: '/mypaper',
        name: 'Mypaper',
        component: () => import('../views/paper/Mypaper.vue')
      },
      {
        path: '/paper',
        name: 'Paper',
        component: () => import('../views/paper/Paper.vue'),
        redirect: '/paper/info',
        children: [
          {
            path: 'info',
            name: 'Info',
            component: () => import('../views/paper/paperInfo/Info.vue')
          },
          {
            path: 'download',
            name: 'Download',
            component: () => import('../views/paper/paperInfo/Download.vue')
          },
          {
            path: 'process',
            name: 'Process',
            component: () => import('../views/paper/paperInfo/Process.vue')
          },
          {
            path: 'pay',
            name: 'Pay',
            component: () => import('../views/paper/paperInfo/Pay.vue')
          },
          {
            path: 'publish',
            name: 'Publish',
            component: () => import('../views/paper/paperInfo/Publish.vue')
          }
        ]
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
