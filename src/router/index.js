import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/myPaper',
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
        path: '/myPaper',
        name: 'MyPaper',
        component: () => import('../views/paper/MyPaper.vue')
      },
      {
        path: '/charge',
        name: 'Charge',
        component: () => import('../views/user/Charge.vue')
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
  {
    path: '/previewLogin',
    name: 'PreviewLogin',
    component: () => import('../views/review/PreviewLogin.vue')
  },
  {
    path: '/review',
    name: 'Review',
    component: () => import('../views/review/Review.vue'),
    redirect: '/papers',
    children: [
      {
        path: '/papers',
        name: 'Papers',
        component: () => import('../views/review/Papers.vue')
      },
      {
        path: '/userInfo',
        name: 'ModifyInfo',
        component: () => import('../views/user/ModifyInfo.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
