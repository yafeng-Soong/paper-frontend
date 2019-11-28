<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="3"><div class="el-col bg-purple">原稿下载</div></el-col>
      <v-btn
        :disabled="!downloadAble"
        text
        icon
        color="success"
        title="下载"
        @click="downloadFile()"
        style="margin-top: 4px">
        <v-icon>cloud_download</v-icon>
      </v-btn>
      <v-chip v-if="!downloadAble" outlined>已撤回不能下载</v-chip>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="3"><div class="el-col bg-purple">修改更新</div></el-col>
      <v-btn 
        :disabled="!updateAble" 
        text 
        icon 
        color="warning" 
        title="更新"
        @click="update()">
        <v-icon>cloud_upload</v-icon>
      </v-btn>
      <v-chip v-if="!updateAble" outlined>当前状态不能上传</v-chip>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';


export default {
  name: 'download',
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
  computed: {
    downloadAble(){
      return this.paperInfo.checkStatus !== '已撤回';
    },
    updateAble(){
      return this.paperInfo.checkStatus === '待审核' || this.paperInfo.checkStatus === '待修改';
    }
  },
  methods:{
    downloadFile(){
      let url = this.$store.getters.getBaseUrl + this.paperInfo.filePath;
      let that = this
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      }).then(res => {
        let filename = that.paperInfo.filePath.split("/").pop();
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }).catch(err => {
        console.log(err)
        this.$toast.error("下载文件出错！")
      });
    },
    update(){
      this.$router.push({ name: 'Submit', params: { paperId: this.paperInfo.id }})
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
