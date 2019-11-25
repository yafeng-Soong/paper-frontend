<template>
  <v-app id="inspire">
    <div class="request-loading-component" v-show="loading">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>综设III—专家审稿系统</v-toolbar-title>
    </v-app-bar>
    <register-dialog
      :dialog="registerDialog"
      @on-change-dialog="changRegisterDialog"
    ></register-dialog>
    <reset-dialog
      :dialog="resetDialog"
      @on-change-reset-dialog="changeResetDialog"
    ></reset-dialog>
    <v-content class="login-wrap">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="login-panel">
              <v-toolbar dark color="primary">
                <v-toolbar-title>登录专家审稿系统</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation >
                  <v-text-field class="text-field"
                                v-model="loginInfo.email"
                                prepend-icon="email"
                                name="login"
                                label="邮箱"
                                hint="请输入注册时的邮箱"
                                type="text"
                                :rules="emailRules"
                                required></v-text-field>
                  <v-text-field class="text-field"
                                v-model="loginInfo.password"
                                id="password"
                                prepend-icon="lock"
                                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                :type="showPassword ? 'text' : 'password'"
                                name="password"
                                label="密码"
                                :rules="pwdRules"
                                @click:append="showPassword = !showPassword"
                                required
                                @keyup.enter="Login"></v-text-field>
                </v-form>
              </v-card-text >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="resetDialog = true">忘记密码</v-btn>
                <v-btn color="primary" text @click="registerDialog = true">注册</v-btn>
                <v-btn color="primary" @click="Login">登录</v-btn>
              </v-card-actions>
            </v-card>
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
  import userApi from "@/api/userApi.js"
  import RegisterDialog from '@/components/login/RegisterDialog.vue'
  import ResetDialog from '@/components/login/ResetDialog.vue'
  export default {
    name: "PreviewLogin",
    components:{
      RegisterDialog,
      ResetDialog
    },
    data(){
      return{
        valid: true,//开启表单的检查
        showPassword: false,
        loading: false,
        registerDialog: false,
        resetDialog: false,
        loginInfo:{
          email:'',
          password:''
        },
        emailRules: [
          v => !!v || '必须输入邮箱字段',
          v => /^\w+([.-]?\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/.test(v) || '请输入正确格式的邮箱'
        ],
        pwdRules: [
          v => !!v || '必须输入密码字段',
          v => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(v) || '密码由 6-16位字母数字组合组成'
        ],
      }
    },
    methods:{
      Login(){
        let that = this
        if (this.$refs.form.validate()) {
          userApi.login(that.loginInfo)
            .then(res => {
              if (res.code !== 200){
                this.$toast.error(res.msg)
              }else if (res.data.role === 'admin'){
                that.loading = true
                this.$toast.success("登陆成功！请稍等~")
                this.$store.commit('SET_CURRENT_USER', res.data)
                setTimeout(() => {
                  that.loading = false
                  that.$router.replace('/home');
                }, 1500)
              }else {
                userApi.logout()
                this.$toast.error('您不是专家，无法进入审稿系统')
              }
            })
            .catch(err => {
              that.loading = false
              console.log(err)
            })
        }
      },
      changRegisterDialog(val) {
        this.registerDialog = val
      },
      changeResetDialog(val) {
        this.resetDialog = val
      }
    }
  }
</script>

<style lang="scss" scoped>

  .request-loading-component {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: rgba(48, 65, 86, 0.5);*/
    font-size: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 999999;
  }
  .card-panel{
    height: 300px;
    .tips{
      height: 220px;
      overflow-y: scroll;
    }
  }

  .login-panel{
    height: 300px;
  }
</style>
