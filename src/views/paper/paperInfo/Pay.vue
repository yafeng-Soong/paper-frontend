<template>
  <div>
    <el-table
      v-if="checkStatus"
      :data="list"
      style="width: 70%">
      <el-table-column
        prop="name"
        label="版面费">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="isPaid"
        label="交款否">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isPaid==='未交'" @click="handlePayClick(scope.row)" type="success" size="small">付款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>无付款项</div>
  </div>
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"

export default {
  name: 'pay',
  components: {
  },
  data(){
    return {
      checkStatus: false,
      // list is for test
      list: [{
        name: '版面费',
        money: 1800,
        isPaid: '未交'
      }]
    }
  },
  mounted: function () {
    let pay = this.$store.getters.getPaperInfo.checkStatus;
    this.checkStatus = pay==='已通过待付款'?true:false;
  },
  methods:{
    handlePayClick() {
      this.$message.success("付款成功！");
      this.list[0].isPaid = '已交'
      // 付款端口……
    }
  }
}
</script>