<template>
    <v-dialog v-model="dialog_" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">找回密码</span>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            v-model="email"
            label="注册邮箱" 
            name="email"
            prepend-icon="email"
            required
            hint="请输入注册时的邮箱"
            type="text"
            :rules="emailRules"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_=false">关闭</v-btn>
          <v-btn color="blue darken-1" text :disabled="!resetDisable" @click="reset">发送邮件</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import userApi from '@/api/userApi.js'
export default {
    props:{
      dialog: {
        types: Boolean,
        default: false
      }
    },
    data() {
        return {
            email: null,
            emailRules: [
                v => !!v || '必须输入邮箱字段',
                v => /^\w+([.-]?\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/.test(v) || '请输入正确格式的邮箱'
            ],
        }
    },
    computed: {
      dialog_: {
        get() {
          return this.dialog;
        },
        set(val) {
          //drawer_改变由父组件控制
          this.$emit("on-change-reset-dialog", val);
        }
      },
      resetDisable() {
          return /^\w+([.-]?\w+)*@\w+([.-]\w+)*(\.\w{2,3})+$/.test(this.email)
      }
    },
    methods: {
        reset(){
            userApi.resetPassword(this.email)
                .then(res => {
                    if (res.code === 200){
                        this.$toast.success(res.data)
                        this.dialog_ = false
                    }else this.$toast.error(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>