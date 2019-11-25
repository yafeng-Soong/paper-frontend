<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>综设III—专家审稿系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar>
        <v-img :src="headImgUrl"></v-img>
      </v-avatar>
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
  export default {
    name: "Review",
    data(){
      return {
        isRouterAlive: true,
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
    }
  }
</script>

<style scoped>

</style>
