<template>
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
</template>

<script>
// @ is an alias to /src
//import paperApi from "@/api/paperApi.js"

export default {
  name: 'process',
  components: {
  },
  data(){
    return {
      list: []
    }
  },
  mounted: function () {
    this.list = this.$store.getters.getOperationDetail;
  },
  methods:{

  }
}
</script>