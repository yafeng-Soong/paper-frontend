<template>
  <v-card class="panel">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text class="card-body">
          是否支付 版面费 1800 元？
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            text
            @click="prev"
          >
            返回
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            @click="pay">
            确认支付
          </v-btn>
        </v-card-actions>
      </v-window-item>

      <v-window-item :value="2">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            :src="finish"
          ></v-img>
          <h3 class="title font-weight-light mb-2">您已完成本次支付</h3>
          <span class="caption grey--text">请关闭此页面！</span>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            @click="close">
            关闭
          </v-btn>
        </v-card-actions>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
  import paperApi from "@/api/paperApi.js"
  export default {
    name: "Charge",
    components: {
    },
    props:['paperId'],
    data() {
      return {
        step: 1,
        finish: require('@/assets/ok.png')
      }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return '确认支付'
          default: return '支付完成'
        }
      }
    },
    methods:{
      next () {
        this.step = this.step + 1 === 3
          ? 2
          : this.step + 1
      },
      pay () {
        let that = this;
        paperApi.pay({cash: 1800,
                      paperId: that.paperId})
        .then(res => {
          if (res.code === 200){
            this.$toast.success("支付成功！")
            this.$store.commit('SET_CURRENT_USER', res.data)
            that.step++
          }else {
            console.log("支付失败~")
            this.$toast.error(res.data)
            this.$router.replace("/charge")
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      prev () {
        this.$router.replace("/paper")
      },
      close(){
        this.$router.replace("/myPaper")
      }
    }
  }
</script>

<style lang="less" scoped>
  /*.panel{*/
  /*  width: 50%;*/
  /*  margin-left: 25%;*/
  /*  margin-top: 3%;*/
  /*}*/
  .card-body{
    min-height: 300px;
  }
  .card-body /deep/ .v-input__control{
    margin: 0 auto;
  }
</style>
