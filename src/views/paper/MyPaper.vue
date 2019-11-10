<template>
  <v-card
    style="width: 60%; margin-left: 20%">
    <v-toolbar  dark color="primary">
      <v-toolbar-title style="font-size: x-large">我的投稿</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        single-line
        prepend-inner-icon="search"
        placeholder="查找"
        style="width: 10px"
      ></v-text-field>
      <v-btn icon title="投稿"><v-icon>mdi-plus-circle</v-icon></v-btn>
      <template #extension>
        总计{{pageInfo.total}}篇
      </template>
    </v-toolbar>
    <el-table
      class="pa-4"
      style="height: 400px;"
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
        width="140">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <v-btn @click="detail(scope.row)" text icon color="primary" title="论文详情">
            <v-icon>subject</v-icon>
          </v-btn>
          <v-btn v-if="downloadAble(scope.row)" text icon color="success" title="下载" @click="downloadFile(scope.row)">
            <v-icon>cloud_download</v-icon>
          </v-btn>
          <v-btn v-if="updateAble(scope.row)" text icon color="warning" title="更新">
            <el-upload
              :show-file-list="false"
              action=""
              :data="scope.row"
              accept="application/msword, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              :http-request="updateFile"
              :before-upload="beforeUpload">
              <v-icon>cloud_upload</v-icon>
            </el-upload>
          </v-btn>
          <v-btn v-if="cancelAble(scope.row)" text icon color="error" title="撤回" @click="cancel(scope.row)">
            <v-icon>block</v-icon>
          </v-btn>
        </template>
      </el-table-column>
    </el-table>
    <v-card-actions>
      <pagination
        :currentPage="pageInfo.pageNum"
        :total="pageInfo.pages" @on-change-page="changePage"></pagination>
    </v-card-actions>
  </v-card>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"
import axios from 'axios';
import Pagination from '@/components/common/Pagination.vue'

export default {
  name: 'myPaper',
  components: {
    Pagination
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
  mounted() {
    this.getPaperList();
  },
  methods:{
    downloadAble(val){
      return val.checkStatus !== '已撤回';
    },
    updateAble(val){
      return val.checkStatus === '待审核' || val.checkStatus === '待修改';
    },
    cancelAble(val){
      return val.checkStatus === '待审核';
    },
    getPaperList(){
      let that = this;
      paperApi.paperSearchAll(that.pageInfo)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            that.list = res.data.data;
            that.pageInfo.pages = res.data.pages;
            that.pageInfo.total = res.data.total;
          }else{
            console.log('获取论文列表失败！');
            this.$toast.error(res.msg);
          }
        })
        .catch(err => {
          console.log('网络错误！'+err);
        })
    },
    changePage(val){
      this.pageInfo.pageNum = val;
      this.getPaperList();
    },
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
    updateFile(param) {
      let that = this;
      let paper = {
        note: "更新了文件",
        filePath: null,
        id: param.data.id
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
