<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="3"><div class="el-col bg-purple">发表情况</div></el-col>
      <el-col :span="15"><div class="el-col bg-purple-light">{{paperInfo.checkStatus}}</div></el-col>
    </el-row>
    <el-row :gutter="12"  v-if="downloadAble()">
      <el-col :span="3"><div class="el-col bg-purple">录用通知</div></el-col>
      <v-btn
        text
        icon
        color="success"
        title="下载"
        @click="download()"
        style="margin-top: 4px">
        <v-icon>cloud_download</v-icon>
      </v-btn>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"

export default {
  name: 'publish',
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
    downloadAble(){
      return this.paperInfo.checkStatus === '已付款';
    },
    download(){
      let routeUrl = this.$router.resolve({
        path: "/notification"
      });
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>

<style>
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