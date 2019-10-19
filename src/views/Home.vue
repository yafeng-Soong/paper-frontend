<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary" @click="sayHello">sayHello</el-button>
    <el-button type="primary" @click="logout">logout</el-button>
    <HelloWorld msg="欢迎来到vue项目首页哦"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import userApi from "@/api/userApi.js"

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods:{
    sayHello(){
      userApi.sayHello()
              .then(res => {
                this.$toast.info(res)
                let user = this.$store.getters.getCurrentUser
                console.log("当前登录用户~~~")
                console.log(user)
                console.log("~~~~~")
              })
              .catch(err => {
                console.log(err)
                this.$toast.error("网络异常")
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
                this.$toast.error("网络异常")
              })
    }
  }
}
</script>
