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
          <v-radio-group :column=false v-model="choice">
            <v-row justify="center">
              <v-col cols="6" v-for="pic in pics" :key="pic.color">
                <charge-radio
                  class="pa-12"
                  :color="pic.color"
                  :src="pic.src">
                </charge-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            depressed
            @click="next"
          >
            继续
          </v-btn>
        </v-card-actions>
      </v-window-item>

      <v-window-item :value="2">
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

      <v-window-item :value="3">
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
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
  import paperApi from "@/api/paperApi.js";
  import userApi from "@/api/userApi.js"
  import ChargeRadio from '@/components/common/ChargeRadio.vue';
  export default {
    name: "Charge",
    components: {
      ChargeRadio
    },
    props:['paperId'],
    data() {
      return {
        step: 1,
        choice: 0,
        pics: [
          {src: require('@/assets/weChat.png'), color: 'green'},
          {src: require('@/assets/aliPay.png'), color: 'blue'}
        ],
        finish: require('@/assets/ok.png'),
        onboarding: 0,
        cashRule: [
          v => !!v || '必须输入金额字段',
          v => /^\+?[1-9][0-9]*$/.test(v) || '请输入整数',
          v => (v > 0 && v < 10000) || '确保金额在0到10000之间'
        ],
        cash: null
      }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return '选择支付方式'
          case 2: return '确认支付'
          default: return '支付完成'
        }
      },
      chargeDisable(){
        return !(/^\+?[1-9][0-9]*$/.test(this.cash) && this.cash > 0 && this.cash < 10000)
      }
    },
    methods:{
      next () {
        this.step = this.step + 1 === 4
          ? 3
          : this.step + 1
      },
      pay () {
        let that = this;
        userApi.charge({charge: 1800})
          .then(res => {
            if (res.code === 200){
              console.log("充值成功！")
            }else {
              console.log("充值失败~")
            }
          })
          .then(
            paperApi.pay({cash: 1,
                          paperId: this.paperId})
            .then(res => {
              console.log(res);
              if (res.code === 200){
                this.$toast.success("支付成功！")
                that.step++
              }else {
                console.log("支付失败~")
                this.$toast.error("支付失败，请稍后再试")
              }
            })
            .catch(err => {
              console.log(err)
            })
          )
          .catch(err => {
            console.log(err)
          })

      },
      prev () {
        this.step--
      },
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
