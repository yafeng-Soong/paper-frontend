<template>
  <div>
    <detail-dialog :dialog="detailDialog" :paper-info="paperInfo" @on-change-detail-dialog="changeDetailDialog"></detail-dialog>
    <v-card
      style="width: 60%; margin-left: 20%; margin-top: 3%">
      <v-toolbar  dark color="primary">
        <v-toolbar-title style="font-size: x-large">论文发表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          hide-details
          single-line
          prepend-inner-icon="search"
          placeholder="查找"
          style="width: 10px"
        ></v-text-field>
        <v-btn icon title="等待发表"><v-icon>mdi-plus-circle</v-icon></v-btn>
        <template #extension>
          总计{{pageInfo.total}}篇
        </template>
      </v-toolbar>
      <el-table
        class="pa-2"
        style="height: 360px;"
        :data="list"
        align-center justify-center>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="name"
          label="论文标题"
          width="160">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="publisherEmail"
          label="投稿人邮箱"
          width="180">
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
            <v-btn v-if="passAble(scope.row)" text icon color="accent" title="发表" @click="pass(scope.row)">
              <v-icon>mdi-pencil</v-icon>
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
  </div>
</template>

<script>
  import reviewApi from "@/api/reviewApi.js"
  import axios from 'axios'
  import Pagination from '@/components/common/Pagination.vue'
  import DetailDialog from "../../components/review/DetailDialog";
  export default {
    name: "Papers",
    components: {
      Pagination,
      DetailDialog
    },
    data(){
      return {
        passDialog: false,
        rejectDialog: false,
        detailDialog: false,
        pageInfo: {
          pageNum: 1,
          pageSize: 5,
          total: 0,
          pages: 1,
          checkStatus: 3
        },
        checkInfo: {
          note: "",
          paperId: null,
          type: null
        },
        paperId: null,
        paperInfo: null,
        list: []
      }
    },
    mounted() {
      this.getPaperList();
    },
    methods: {
      downloadAble(val){
        return val.checkStatus !== 4;
      },
      passAble(val){
        return val.checkStatus === 3;
      },
      pass(val){
        this.checkInfo.paperId = val.id
        this.checkInfo.type = 6
        this.checkInfo.note = "论文被编辑发表"
        reviewApi.check(this.checkInfo)
          .then(res => {
            if (res.code === 200){
              this.$toast.success(res.msg)
              this.dialog = false
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            }else {
              console.log(res.data)
              this.$toast.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      detail(val){
        this.detailDialog = true
        this.paperId = val.id
        this.paperInfo = val
      },
      changeDetailDialog(val){
        this.detailDialog = val
      },
      getPaperList(){
        let that = this;
        reviewApi.getPaperList(that.pageInfo)
          .then(res => {
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
    }
  }
</script>

<style scoped>

</style>
