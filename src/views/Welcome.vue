<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>综合设计III-论文投稿系统</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid style="width: 60%; margin-left: 20%">
        <v-row align="center" justify="center">
          <v-carousel>
            <v-carousel-item
              v-for="data in dataList"
              :key="data.color">
              <v-card height="100%">
                <v-toolbar
                  :color="data.color"
                  dark>
                  <v-card-title>{{data.title}}</v-card-title>
                </v-toolbar>
                <v-card-text class="text-wrapper">
                  {{data.content}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="contribute">进入投稿系统</v-btn>
                  <v-btn color="success">进入审稿系统</v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="primary"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        dataList: [
          {
            color: 'primary',
            title: '1、投稿程序',
            content: '1）首先点击“作者在线投稿”，进入后请仔细看投稿说明，然后“注册”，用注册后的登陆名、密码进入投稿系统，如果要投稿点击“我要投稿”，仔细阅读投稿须知、论文模板、著作权转让合同，然后按照投稿向导进行投稿(  上传稿件全文后要点击“下一步”，并继续完成下面的投稿步骤），投稿后请您耐心等待，不要重复投稿，编辑部会在1周内完成初审，整个审稿周期为2个月。\n' +
              '2）请您下载论文模板并据此规范您的稿件。投稿后请您耐心等待，可通过首页的“作者在线查稿”随时查看稿件的处理情况，如无特殊情况编辑部不接受电话查询，谢谢您的支持与合作。\n' +
              '3）作者收到审稿专家的修改意见后，请认真修改并撰写修改说明。上传修改稿需点击“投修改稿”。'
          },
          {
            color: 'yellow darken-2',
            title: '2、来稿要求和注意事项',
            content: '1)来稿务必重点突出，论据充分，数据可靠，文字简练。每篇论文(含图、表、参考文献、英文摘要)一般不超过6000字(有创新性的论文可适当放宽要求，但要突出创新点)。投稿同时必须提交著作权转让合同(PDF)。论文必须包括(按顺序)：题目、摘要、关键词(3～8个)、分类号、正文、参考文献。中文题名不超过20个汉字，文章格式参见论文模版。\n' +
              '2)论文摘要应尽量写成报道性摘要，包括研究的目的、方法、结果和结论。切忌把应在引言中出现的内容写入摘要，不要对论文内容作自我评价。采用第3人称的写法，不要使用“本文”、“作者”等作主语，建议采用“为了（针对，根据）......对......进行研究（分析）”、“阐述……过程，提出......观点”等，以200～300字左右为宜。\n' +
              '3)文稿用5号宋体，量和单位符号等必须符合国家标准的规定。稿中外文字母、符号必须分清大、小写、正、斜体，上、下角的字母、数码和符号要清晰，矩阵、矢量用黑体表示。\n' +
              '4)文中图、表只附最必要的，凡能用文字说明的尽量不用图表。\n' +
              '5)来稿如不符合上述要求，编辑部将先退请作者修改后再送审。'
          },
          {
            color: 'red',
            title: '3、其他约定',
            content: '1)投稿作者须转让论文版权（含各种介质的版权）给编辑部，并签定著作权转让合同。\n' +
              '2)凡在国内外正式出版的刊物上登载过的稿件，本刊一律不予刊登。若发现一稿多投者，本刊将追补对本刊造成的损失，并不再接收其稿件。\n' +
              '3)编辑部编辑稿件时有权对录用稿件作适当删改。\n' +
              '4)凡向本刊投稿者，均视作接受上述各项约定，本刊不再特别声明。\n' +
              '\n' +
              ' 联系电话：010-62770175-3402（3404、3405、3406）'
          }
        ],
        colors: [
          'primary',
          'accent',
          'yellow darken-2',
          'red',
          'orange',
        ],
      }
    },
    methods:{
      contribute(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .text-wrapper {
    white-space: pre-wrap;
    height: 60%;
  }
</style>
