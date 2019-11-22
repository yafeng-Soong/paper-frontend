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
        title="更新">
        <el-upload
          :show-file-list="false"
          action=""
          accept="application/msword, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          :http-request="updateFile"
          :before-upload="beforeUpload">
          <v-icon>cloud_upload</v-icon>
        </el-upload>
      </v-btn>
      <v-chip v-if="!updateAble" outlined>当前状态不能上传</v-chip>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"
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
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 15;
      if (!isLt2M) {
        this.$toast.error('上传文件大小不能超过 15MB!');
      }
      return isLt2M;
    },
    updateFile(param) {
      let that = this;
      let paper = {
        note: "更新了文件",
        filePath: null,
        id: that.paperInfo.id
      };
      const formData = new FormData();
      formData.append('file', param.file);
      paperApi.paperFileUpload(formData)
        .then(res => {
          if (res.code === 200) {
            console.log('更新文件成功！');
            paper.filePath = res.data;
            paperApi.paperUpdate(paper)
              .then(res => {
                if (res.code === 200){
                  console.log("更新记录成功！")
                  that.$toast.success("更新成功！");
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                }else {
                  console.log('更新记录失败！' + res.data);
                  that.$toast.error(res.msg);
                }
              })
              .catch(err => {
                console.log("网络出错" + err)
              })
          }else{
            console.log('更新文件失败！' + res.data);
            that.$toast.error(res.msg);
          }
        })
        .catch(err => {
          console.log('网络错误！'+err);
        })
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
