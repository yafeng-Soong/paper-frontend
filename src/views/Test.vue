<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-col class="text-center">
            <el-button type="primary" @click="sayHello">sayHello</el-button>
            <el-button type="primary" @click="selectPageList">权限测试</el-button>
            <el-button type="primary" @click="logout">logout</el-button>
        </v-col>
    </v-row>
</template>

<script>
// @ is an alias to /src
import userApi from "@/api/userApi.js"

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      drawer: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        sex: 1
      }
    }
  },
  methods:{
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
                this.$store.commit('SET_CURRENT_USER', null)
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
    }
  }
}
</script>