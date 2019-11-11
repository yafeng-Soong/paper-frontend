<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <div class="request-loading-component" v-show="loading">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>综设III—论文投稿系统</v-toolbar-title>
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
            <v-card class="card-panel">
              <v-card-title align-center>投稿说明</v-card-title>
              <v-card-text class="tips">
                <p align="left">
                <b>1.投稿程序</b>

                <br>1）首先点击“作者在线投稿”，进入后请仔细看投稿说明，然后“注册”，用注册后的登陆名、密码进入投稿系统，如果要投稿点击“我要投稿”，仔细阅读投稿须知、论文模板、著作权转让合同，然后按照投稿向导进行投稿(  上传稿件全文后要点击“下一步”，并继续完成下面的投稿步骤），投稿后请您耐心等待，不要重复投稿，编辑部审稿周期为2个月。
                <br>2）请您下载论文模板并据此规范您的稿件。投稿后请您耐心等待，可通过首页的“作者在线查稿”随时查看稿件的处理情况，如无特殊情况编辑部不接受电话查询，谢谢您的支持与合作。
                <br>3）作者收到审稿专家的修改意见后，请认真修改并撰写修改说明。上传修改稿需点击“投修改稿”。

                <br><b>2.来稿要求和注意事项</b>

                <br>1)来稿务必重点突出，论据充分，数据可靠，文字简练。每篇论文(含图、表、参考文献、英文摘要)一般不超过6000字(有创新性的论文可适当放宽要求，但要突出创新点)。投稿同时必须提交著作权转让合同。论文必须包括(按顺序)：题目、摘要、关键词(3～8个)、分类号、正文、参考文献。中文题名不超过20个汉字。
                <br>2)论 文摘要应尽量写成报道性摘要，包括研究的目的、方法、结果和结论。切忌把应在引言中出现的内容写入摘要，不要对论文内容作自我评价。采用第3人称的写法， 不要使用“本文”、“作者”等作主语，建议采用“为了（针对，根据）......对......进行研究（分析）”、“阐述……过程，提出......观 点”等，以200～300字左右为宜。
                <br>3)文稿用5号宋体，量和单位符号等必须符合国家标准的规定。稿中外文字母、符号必须分清大、小写、正、斜体，上、下角的字母、数码和符号要清晰，矩阵、矢量用黑体表示。
                <br>4)文中图、表只附最必要的，凡能用文字说明的尽量不用图表。
                <br>5)参 考文献只选最主要的、发表在正式出版物上的文献。内部文件和资料不能作为参考文献引用。无特殊需要不必罗列一般知识性或陈旧史料。文献序号按其在文中出现 先后次序编排。作者姓名用外文的，应按中文习惯，姓前名后，名可缩写，去掉缩写点，只留空。3人以上作者只列3人，后加“等”字。书写参照如下格式：
                期刊：[序号]作者.题名[J](首单词的首字母大写，其余均用小写)。期刊名称(外文可缩写)，出版年份，卷号(期号)：起止页码.
                专著：[序号] 作者.书名[M](首单词的首字母大写，其余均用小写).出版地：出版者，出版年. 起止页码.
                论文集：[序号] 作者.题名[C](首单词的首字母大写，其余均用小写)//论文集主编者.论文集名.出版地：出版者，出版年:起止页码.
                学位论文：[序号] 作者.题名[D](首单词的首字母大写，其余均用小写).保存地点：保存单位，年份.
                标准：[序号] 主要责任者.标准编号—发布年，标准名称[S](首单词的首字母大写，其余均用小写).出版地：出版者，出版年：页码.
                电子文献：主要责任者. 电子文献题名[EB/OL](首单词的首字母大写，其余均用小写).出版地：出版者，出版年(更新或修改日期)[引用日期].获取或访问路径.
                各种未定义类型的文献作者. 文献题名［Z］. 出版地：出版者，出版年.
                <br>6)来稿如不符合上述要求，编辑部将先退请作者修改后再送审。

                <br><b>3.其他约定</b>

                <br>1)投稿作者须转让论文版权（含各种介质的版权）给编辑部，并签定著作权转让合同。
                <br>2)凡在国内外正式出版的刊物上登载过的稿件，本刊一律不予刊登。若发现一稿多投者，本刊将追补对本刊造成的损失，并不再接收其稿件。
                <br>3)编辑部编辑稿件时有权对录用稿件作适当删改。
                <br>4)凡向本刊投稿者，均视作接受上述各项约定，本刊不再特别声明。

                <br><b>4.保密条款</b>
                <br>作者保证论文不泄漏国家秘密。若发生泄密问题，一切责任由作者承担。论文如果为涉密科研项目资助产出论文，作者须提交所在单位的保密审批意见。
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 md1></v-flex>
          <v-flex xs12 sm8 md4>
            <v-card class="login-panel">
              <v-toolbar dark color="primary">
                <v-toolbar-title>登录论文投稿系统</v-toolbar-title>
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
                    required></v-text-field>
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
    name: "Login",
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
            }else{
                that.loading = true
                this.$toast.success("登陆成功！请稍等~")
                this.$store.commit('SET_CURRENT_USER', res.data)
                setTimeout(() => {
                  that.loading = false
                  that.$router.replace('/home');
                }, 1500)
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
    background-color: rgba(48, 65, 86, 0.5);
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
