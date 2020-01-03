<template>
  <v-card
    style="width: 60%;">
    <el-table
      class="pa-2"
      :data="list"
      style="height: 300px">
      <el-table-column
        prop="type"
        label="操作名称"
        width="170px">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间">
      </el-table-column>
      <el-table-column
        label="说明">
        <div slot-scope="scope">
          <el-button type="info" size="small" @click="open(scope.row.note)">详情</el-button>
        </div>
      </el-table-column>
    </el-table>
    <v-card-actions>
      <pagination
        :currentPage="pageInfo.pageNum"
        :total="pageInfo.pages"
        @on-change-page="changePage"></pagination>
    </v-card-actions>
  </v-card>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"
import Pagination from '@/components/common/Pagination.vue'

export default {
  name: 'process',
  components: {
    Pagination
  },
  data(){
    return {
      list: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 4,
        paperId: 0,
        total: 0,
        pages: 1
      },

    }
  },
  mounted: function () {
    this.pageInfo.paperId = this.$store.getters.getPaperInfo.id;
    this.setOperationDetail();
  },
  methods:{
    changePage(val){
      this.pageInfo.pageNum = val;
      this.setOperationDetail();
    },
    setOperationDetail(){
      let that = this;
      paperApi.paperOperationDetail(that.pageInfo)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            that.pageInfo.pages = res.data.pages;
            that.pageInfo.total = res.data.total;
            let list = res.data.data;
            let statusWord = ["提交", "修改", "支付", "退回", "通过","撤销",'发表'];
            for(let i=0; i<list.length; i++){
              list[i].type = statusWord[list[i].type];
              list[i].note = list[i].note==='null'?'无':list[i].note;
            }
            that.list = list;
          }else{
            console.log('获取操作列表失败！');
            that.$toast.error(res.msg);
          }
        })
        .catch(err => {
          console.log('网络错误！'+err);
        })
    },
    open(text) {
        this.$alert(text, '详情', {
          confirmButtonText: '确定'
        });
      }
  }
}
</script>

<style lang="scss">
</style>
