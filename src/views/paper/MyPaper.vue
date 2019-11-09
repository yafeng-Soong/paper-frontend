<template>
  <el-card
    style="width: 60%; margin-left: 20%; height: 500px">
    <div slot="header" class="clearfix">
      <span style="font-size: x-large">我的投稿</span>
    </div>
    <el-table
      :data="list"
      align-center justify-center>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="论文标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="checkStatus"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
<!--          <el-button @click="detail(scope.row)" type="text" size="small">编辑</el-button>-->
          <v-btn @click="detail(scope.row)" text icon color="primary" title="论文详情">
            <v-icon>subject</v-icon>
          </v-btn>
          <v-btn v-if="scope.row.checkStatus !== '已撤回'" text icon color="success" title="下载" @click="downloadFile(scope.row)">
            <v-icon>cloud_download</v-icon>
          </v-btn>
          <v-btn v-if="scope.row.checkStatus !== '已撤回'" text icon color="warning" title="更新">
            <el-upload
              :show-file-list="false"
              action=""
              accept="application/msword, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"

              :before-upload="beforeUpload">
              <v-icon>cloud_upload</v-icon>
            </el-upload>
          </v-btn>
          <v-btn v-if="scope.row.checkStatus !== '已撤回'" text icon color="error" title="撤回" @click="cancel(scope.row)">
            <v-icon>block</v-icon>
          </v-btn>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"
import axios from 'axios';

export default {
  name: 'myPaper',
  components: {
  },
  data(){
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        pages: 1
      },
      cancelParams: {
        paperId: 0,
        note: '撤销了投稿'
      },
      statusWord: ["待审核", "待修改", "已通过待付款", "已付款", "已撤回"],
      list: []
    }
  },
  mounted: function () {
    let that = this;
    paperApi.paperSearchAll(that.pageInfo)
      .then(res => {
        console.log(res);
        if (res.code === 200) {
          that.list = res.data.data;
          that.pageInfo.pages = res.data.pages
          that.pageInfo.total = res.data.total
        }else{
          console.log('获取论文列表失败！');
        }
      })
      .catch(err => {
        console.log('网络错误！'+err);
        that.$message.error(err);
      })
  },
  methods:{
    downloadFile(param){
      let url = this.$store.getters.getBaseUrl + param.filePath;
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      }).then(res => {
        let filename = param.filePath.split("/").pop();
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
    detail(param){
      this.$store.commit('setPaperInfo', param);
      this.$router.push('/paper');
    },
    cancel(params){
      this.cancelParams.paperId = params.id
      paperApi.paperCancel(this.cancelParams)
        .then(res => {
          if (res.code === 200){
            this.$toast.success(res.data)
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }else this.$toast.error(res.msg)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload{
    margin: 0px;
    max-width: 36px;
  }
</style>
