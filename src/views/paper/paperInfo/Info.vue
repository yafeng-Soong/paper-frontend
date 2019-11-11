<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="3"><div class="el-col bg-purple">摘要</div></el-col>
      <el-col :span="15"><div class="el-col bg-purple-light">{{paperInfo.summary}}</div></el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="3"><div class="el-col bg-purple">关键字</div></el-col>
      <el-col :span="15"><div class="el-col bg-purple-light">{{paperInfo.keyword}}</div></el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"

export default {
  name: 'info',
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