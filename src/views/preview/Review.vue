<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>综设III—专家审稿系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn fab v-on="on">
            <v-avatar>
              <v-img :src="headImgUrl"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list >
          <v-list-item v-for="item in items" :key="item.title" :to="item.url" @click="item.action">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content class="login-wrap">
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm12 md12>
            <router-view v-if="isRouterAlive"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import userApi from "../../api/userApi";
  export default {
    name: "Review",
    data(){
      return {
        isRouterAlive: true,
        items: [
          {title: '个人信息', icon: 'mdi-contact-mail', url: '/userInfo'},
          {title: '论文审查', icon: 'mdi-file-find', url: '/papers'},
          {title: '退出登录', icon: 'mdi-power', action: this.logout}
        ],
      }
    },
    computed: {
      headImgUrl:  function() {
        return this.$store.getters.getBaseUrl+this.$store.getters.getCurrentUser.avatar
      },
    },
    methods:{
      reload(){
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      logout(){
        userApi.logout()
          .then(res =>{
            this.$toast.info(res)
            this.$store.commit('SET_CURRENT_USER', null)
            this.$router.replace("/previewLogin")
          })
          .catch(err =>{
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
