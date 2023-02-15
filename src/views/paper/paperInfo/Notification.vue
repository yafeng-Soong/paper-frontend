<template>
  <div class="table">
    <div class="header">
      <div style="float: left; width: 240px">
        <div class="text-type">
          <div>RCCSE 中国核心学术期刊</div>
          <div>(A-)</div>
        </div>
      </div>
      <div style="float: left; width: 350px">
        <div class="text-title">
          <div style="font-size: 40px; letter-spacing: 7px;">实验科学与技术</div>
          <div style="font-size: 15px; margin-top: 15px; margin-left: -8px;">EXPERIMENT SCIENCE AND TECHNOLOGY</div>
        </div>
      </div>
    </div>
    <div class="title">论文录用通知</div>
    <div class="main">
      <div>论文编号：{{paperInfo.id}}</div>
      <div>作者：{{paperInfo.author}}</div>
      <div>撰写的论文《{{paperInfo.name}}》，经过专家评审和学报编辑部研究，我刊决定正式录用。</div>
      <div>国内统一刊号：CN 51-1653/N</div>
      <div>国际标准刊号：ISSN 1627-4550</div>
      <div style="text-align: right; margin-top: 30px">
        <div>感谢对我刊的支持，欢迎继续投稿</div>
        <div>《实验科学与技术》编辑部</div>
        <div>{{getNowFormatDate()}}</div>
      </div>
      <div class="footer">地址：成都市建设北路二段4号电子科技大学</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Notification',
  components: {
  },
  data(){
    return {
      paperInfo: {}
    }
  },
  mounted: function () {
    this.paperInfo = this.$store.getters.getPaperInfo;
    window.print();
  },
  methods:{
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  }
}
</script>

<style>
  .table{
    position: relative;
    width: 600px;
    height: 900px;
    border: 1px solid gray;
    margin: 60px auto;
  }
  .header{
    height: 230px;
    border-bottom: 1px solid gray;
  }
  .text-type{
    margin: 90px auto;
    width: 240px;
    text-align: center;
  }
  .text-title{
    margin: 80px auto;
    width: 350px;
    text-align: center;
    font-weight: bold;
  }
  .title{
    margin-top: 60px;
    text-align: center;
    font-weight: 500;
    font-size: 30px;
  }
  .main{
    margin: 30px 40px;
    line-height: 40px;
    font-size: 17px;
    text-indent: 34px;
  }
  .footer{
    position: absolute;
    bottom: 15px;
    margin-left: -50px;
  }
</style>