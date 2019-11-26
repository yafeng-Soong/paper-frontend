<template>
  <v-dialog v-model="dialog_" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">退回稿件</span>
      </v-card-title>
      <v-card-text>
        <v-textarea
          :value="reason"
          label="退回理由"
          outlined
          name="reject"
          required
          :rules="rejectRules"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog_=false">关闭</v-btn>
        <v-btn color="blue darken-1" text :disabled="!rejectDisable" @click="reject">退回</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import reviewApi from "../../api/reviewApi";
  export default {
    name: "RejectDialog",
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
          type: 3
        },
        reason: '\t　　论文作者没按我的审稿意见作实质性修改，上次的具体审稿意见为： 1. 论文摘要对论文工作的概述不够，特别是对论文的研究工作概述不够，而是大量的进行了热门短视频的介绍，建议修改。另外，“百度AI技术”太过笼统，应说清楚用了百度AI技术里面的什么具体的技术，同时“MATLAB”是个软件平台，不是“分析方法”。 2. 2.4节中的“AI分析方法”具体是什么方法？建议给予说明。 3. 2.4节中将弹幕类型分为十类，依据是什么？同时，为什么这十类的关键词设置为表2中罗列的关键词，有何依据？如果仍不能按我的审稿意见作实质性修改，建议退稿。\n',
        rejectRules: [
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
          this.$emit("on-change-reject-dialog", val);
        }
      },
      rejectDisable() {
        return (this.reason.length > 0 && this.reason.length < 1000)
      }
    },
    methods: {
      reject(){
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
