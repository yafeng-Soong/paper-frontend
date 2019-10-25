<template>
  <!-- <v-row justify="center"> -->
    <v-dialog v-model="dialog_" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">用户注册</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  v-model="registerInfo.email"
                  label="邮箱*" 
                  name="email"
                  prepend-icon="email"
                  required
                  hint="请确保邮箱正确、可使用"
                  type="text"
                  :rules="emailRules"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  v-model="registerInfo.password"
                  label="密码*"
                  name="password"
                  prepend-icon="lock"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :type="showPassword ? 'text' : 'password'"
                  hint="密码由6-16位字母数字组合组成"
                  required
                  :rules="pwdRules"
                  @click:append="showPassword = !showPassword"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmPassword"
                  :disabled="!confirmDisable"
                  label="重复密码*"
                  name="confirmPassword"
                  prepend-icon="lock"
                  :type="showPassword ? 'text' : 'password'"
                  hint="请重复密码"
                  required
                  :rules="confirmRules"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*为必填字段</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_=false">关闭</v-btn>
          <v-btn color="blue darken-1" text :disabled="!registerDisable" @click="register">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-row> -->
</template>

<script>
  import userApi from "@/api/userApi.js"
  export default {
    props:{
      dialog: {
        types: Boolean,
        default: false
      }
    },
    data() {
      return {
        showPassword: false,
        confirmPassword: null,
        registerInfo: {
          email: null,
          password: null
        },
        emailRules: [
          v => !!v || '必须输入邮箱字段',
          v => /^\w+([.-]?\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/.test(v) || '请输入正确格式的邮箱'
        ],
        pwdRules: [
          v => !!v || '必须输入密码字段',
          v => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(v) || '密码由6-16位字母数字组合组成'
        ],
        confirmRules: [
          v => !!v || '请重复密码',
          v => this.registerInfo.password === v || '前后两次输入密码不一致'
        ]
      }
    },
    computed: {
      dialog_: {
        get() {
          return this.dialog;
        },
        set(val) {
          //drawer_改变由父组件控制
          this.$emit("on-change-dialog", val);
        }
      },
      confirmDisable() {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.registerInfo.password)
      },
      registerDisable() {
        let email = /^\w+([.-]?\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/.test(this.registerInfo.email)
        let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.registerInfo.password)
        let confirm = (this.registerInfo.password === this.confirmPassword)
        return email && password && confirm
      }
    },
    methods: {
      register() {
        userApi.register(this.registerInfo)
          .then(res => {
            if (res.code === 200){
              this.dialog_ = false
              this.$toast.success(res.data)
            } else{
              this.$toast.error(res.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>
