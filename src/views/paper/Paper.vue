<template>
  <div class="table">
    <el-row :gutter="12">
      <el-col :span="6"><div class="el-col bg-purple">稿号</div></el-col>
      <el-col :span="18"><div class="el-col bg-purple-light">{{paperInfo.id}}</div></el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="6"><div class="el-col bg-purple">文题</div></el-col>
      <el-col :span="18"><div class="el-col bg-purple-light">{{paperInfo.name}}</div></el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="6"><div class="el-col bg-purple">更新时间</div></el-col>
      <el-col :span="6"><div class="el-col bg-purple-light">{{paperInfo.updateTime}}</div></el-col>
      <el-col :span="6"><div class="el-col bg-purple">收稿时间</div></el-col>
      <el-col :span="6"><div class="el-col bg-purple-light">{{paperInfo.createTime}}</div></el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="6"><div class="el-col bg-purple">稿件状态</div></el-col>
      <el-col :span="18"><div class="el-col bg-purple-light">{{paperInfo.checkStatus}}</div></el-col>
    </el-row>
    <el-button-group style="margin-bottom: 15px">
      <el-button type="info" plain @click="ttInfo" autofocus>当前稿件信息</el-button>
      <el-button type="info" plain @click="ttDownload">稿件全文</el-button>
      <el-button type="info" plain @click="ttProcess">稿件处理情况</el-button>
      <el-button type="info" plain @click="ttPay">本文费用情况</el-button>
      <el-button type="info" plain @click="ttPublish">发表情况</el-button>
    </el-button-group>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"

export default {
  name: 'paper',
  components: {
  },
  data(){
    return {
      paperInfo: {}
    }
  },
  mounted: function () {
    this.paperInfo = this.$store.getters.getPaperInfo;
  },
  methods:{
    ttInfo(){
      this.$router.replace("/paper/info")
    },
    ttDownload(){
      this.$router.replace("/paper/download")
    },
    ttProcess(){
      this.$router.replace("/paper/process")
    },
    ttPay(){
      this.$router.replace("/paper/pay")
    },
    ttPublish(){
      this.$router.replace("/paper/publish")
    }
  }
}
</script>

<style>
  .table {
    width: 70%;
    margin-left: 15%;
    padding: 10px;
    /*position: absolute;*/
    /*top: 20px;*/
  }
  .el-row {
    margin-bottom: 10px;
  }
  .el-col {
    border-radius: 4px;
    padding: 5px 0 5px 10px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
