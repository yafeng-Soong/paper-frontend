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
          <el-button v-if="scope.row.isPaid==='未交'" @click="handlePayClick()" type="success" size="small">付款</el-button>
          <el-dialog title="付款" :visible.sync="payDialogVisible" fullscreen @close="closeDialog">
            <userPay :paperId="paperId"></userPay>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>无付款项</div>
  </div>
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"
import userPay from "@/views/user/UserPay.vue"

export default {
  name: 'pay',
  components: {
    userPay
  },
  data(){
    return {
      paperId: 0,
      checkStatus: false,
      // list is for test
      list: [{
        name: '版面费',
        money: 1800,
        isPaid: '未交'
      }],
      payDialogVisible: false
    }
  },
  mounted: function () {
    this.paperId = this.$store.getters.getPaperInfo.id;
    let pay = this.$store.getters.getPaperInfo.checkStatus;
    this.checkStatus = pay==='已通过待付款'?true:false;
  },
  methods:{
    handlePayClick() {
      this.payDialogVisible = true;
      this.list[0].isPaid = '已交'
      // 付款端口……
    },
    closeDialog(){
      this.$router.replace("/myPaper")
    }
  }
}
</script>