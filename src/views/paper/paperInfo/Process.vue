<template>
  <div>
    <el-table
      :data="list"
      style="width: 70%">
      <el-table-column
        prop="type"
        label="操作名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="note"
        label="说明">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pageInfo.pageNum"
      :total="pages" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"

export default {
  name: 'process',
  components: {
  },
  data(){
    return {
      list: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        paperId: 0
      },
      pages: 0
    }
  },
  mounted: function () {
    this.pageInfo.paperId = this.$store.getters.getPaperInfo.id;
    this.setOperationDetail();
  },
  methods:{
    changePage(val){
      this.pageInfo.pageNum = val;
      this.getPaperList();
    },
    setOperationDetail(){
      paperApi.paperOperationDetail(this.pageInfo)
        .then(res => {
          if (res.code === 200) {
            this.pages = res.data.pages;
            let list = res.data.data;
            let statusWord = ["待审核", "待修改", "已通过待付款", "已付款", "已撤回"];
            for(let i=0; i<list.length; i++){
              list[i].type = statusWord[list[i].type];
              list[i].note = list[i].note==='null'?'无':list[i].note;
            }
            this.list = list;
          }else{
            console.log('获取操作列表失败！');
            this.$toast.error(res.msg);
          }
        })
        .catch(err => {
          console.log('网络错误！'+err);
        })
    }
  }
}
</script>