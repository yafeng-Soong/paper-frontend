<template>
  <v-dialog v-model="dialog_" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">通过审查</span>
      </v-card-title>
      <v-card-text>
        <v-textarea
          :value="reason"
          label="通过理由"
          outlined
          name="pass"
          required
          :rules="passRules"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog_=false">关闭</v-btn>
        <v-btn color="blue darken-1" text :disabled="!passDisable" @click="pass">通过</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import reviewApi from "../../api/reviewApi";
  export default {
    name: "PassDialog",
    props:{
      dialog: {
        types: Boolean,
        default: false
      },
      paperId: {
        types: Number,
      }
    },
    data() {
      return {
        checkInfo: {
          note: "",
          paperId: null,
          type: 4
        },
        reason: '\t　　论文具体工程方案设计思路新颖，采用的技术路线先进，工程难度高，工作量大，说明作者在本学科已具有较扎实的专业理论基础，能够应用所学知识和透过阅读文献解决具体的工程问题，具有较强从事科研工作的潜力。论文思路清晰，文笔通顺，图文规范。',
        passRules: [
          v => !!v || '必须通过理由',
          v => (v.length > 0 && v.length < 1000) || '不能少于1000字并且不能超过1000字'
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
          this.$emit("on-change-pass-dialog", val);
        }
      },
      passDisable() {
        return (this.reason.length > 0 && this.reason.length < 1000)
      }
    },
    methods: {
      pass(){
        this.checkInfo.note = this.reason
        this.checkInfo.paperId = this.paperId
        reviewApi.check(this.checkInfo)
          .then(res => {
            if (res.code === 200){
              this.$toast.success(res.msg)
              this.dialog = false
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            }else {
              console.log(res.data)
              this.$toast.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>

</style>
