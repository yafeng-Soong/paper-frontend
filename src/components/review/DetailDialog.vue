<template>
    <v-dialog v-model="dialog_" persistent max-width="600px">
        <v-card>
            <v-card-title class="headline"
                          primary-title>
                <span class="headline">论文详情</span>
            </v-card-title>
            <v-card-text>
                <v-text-field
                        :value="paperInfo.name"
                        label="论文题目"
                        outlined
                        readonly
                ></v-text-field>
                <v-text-field
                        :value="paperInfo.author"
                        label="作者"
                        outlined
                        readonly
                ></v-text-field>
                <v-text-field
                        :value="paperInfo.keyword"
                        label="关键字"
                        outlined
                        readonly
                ></v-text-field>
                <v-textarea
                        :value="paperInfo.summary"
                        label="摘要"
                        :rows="7"
                        outlined
                        readonly
                ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                        text
                        @click="dialog_ = false">
                    关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: "DetailDialog",
    props:{
      dialog: {
        types: Boolean,
        default: false
      },
      paperInfo: {
        types: Object
      },
      paperId: {
        types: Number
      }
    },
    computed: {
      dialog_: {
        get() {
          return this.dialog;
        },
        set(val) {
          //drawer_改变由父组件控制
          this.$emit("on-change-detail-dialog", val);
        }
      },
    }
  }
</script>

<style scoped>

</style>
