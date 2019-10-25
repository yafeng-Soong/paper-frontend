<template>
  <v-app id="inspire">
    <navigation-drawer
      :drawer="drawer"
      @on-change-drawer="changeDrawer"
    >
    </navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>综设III—论文投稿系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-badge 
              color="red"
              overlap
              v-model="messageNum">
              <template v-slot:badge>{{messageNum}}</template>
                <v-icon>notifications</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>查看消息</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <router-view v-if="isRouterAlive"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      color="primary"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import userApi from "@/api/userApi.js"
import NavigationDrawer from '@/components/home/NavigationDrawer.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
    NavigationDrawer
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      drawer: false,
      isRouterAlive: true,
      messageNum: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        sex: 1
      }
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    sayHello(){
      userApi.sayHello()
              .then(res => {
                this.$toast.info(res)
                let user = this.$store.getters.getCurrentUser
                console.log("当前登录用户~~~")
                console.log(user)
                console.log(user.email)
                console.log("~~~~~")
              })
              .catch(err => {
                console.log(err)
              })
    },
    logout(){
      userApi.logout()
              .then(res =>{
                this.$toast.info(res)
                this.$router.replace("/login")
              })
              .catch(err =>{
                console.log(err)
              })
    },
    selectPageList(){
      userApi.selectPageList(this.pageInfo)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeDrawer(val){
      this.drawer = val
    }
  }
}
</script>
