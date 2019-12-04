import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/' || to.path === '/previewLogin' || to.path === '/editorLogin')
    next()
  else {
    if (store.getters.getCurrentUser === null) {
      next('/login')
    } else next()
  }
  if(to.meta.title){
    document.title = to.meta.title;
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
