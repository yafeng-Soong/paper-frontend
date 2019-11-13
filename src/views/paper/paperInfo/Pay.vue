<template>
  <el-table
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
      paperInfo: {},
      // list is for test
      list: [{
        name: '版面费',
        money: 1800,
        isPaid: '已交'
      },{
        name: '审稿费',
        money: 150,
        isPaid: '未交'
      }]
    }
  },
  mounted: function () {
    this.paperInfo = this.$store.getters.getPaperInfo;
  },
  methods:{
    handlePayClick() {
      this.$message.success("付款成功！");
    }
  }
}
</script>