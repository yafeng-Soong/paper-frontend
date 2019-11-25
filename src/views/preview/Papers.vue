<template>
  <v-card
    style="width: 60%; margin-left: 20%; margin-top: 3%">
    <v-toolbar  dark color="primary">
      <v-toolbar-title style="font-size: x-large">论文审查</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        single-line
        prepend-inner-icon="search"
        placeholder="查找"
        style="width: 10px"
      ></v-text-field>
      <v-btn icon title="等待审核"><v-icon>mdi-plus-circle</v-icon></v-btn>
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
          <v-btn v-if="passAble(scope.row)" text icon color="accent" title="通过" @click="cancel(scope.row)">
            <v-icon>mdi-read</v-icon>
          </v-btn>
          <v-btn v-if="cancelAble(scope.row)" text icon color="error" title="退回" @click="cancel(scope.row)">
            <v-icon>mdi-reply</v-icon>
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
  import reviewApi from "@/api/reviewApi.js"
  // import axios from 'axios';
  import Pagination from '@/components/common/Pagination.vue'
  export default {
    name: "Papers",
    components: {
      Pagination
    },
    data(){
      return {
        pageInfo: {
          pageNum: 1,
          pageSize: 5,
          total: 0,
          pages: 1,
          checkStatus: 0
        },
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
        return val.checkStatus === 0;
      },
      cancelAble(val){
        return val.checkStatus === 0;
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
    }
  }
</script>

<style scoped>

</style>
