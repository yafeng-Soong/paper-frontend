<template>
  <el-table
    :data="list"
    style="width: 50%; margin-left: 25%"
    align-center justify-center>
    <el-table-column
      prop="name"
      label="论文标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="checkStatus"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// @ is an alias to /src
import paperApi from "@/api/paperApi.js"

export default {
  name: 'myPaper',
  components: {
  },
  data(){
    return {
      list: []
    }
  },
  mounted: function () {
    let that = this;
    let formData = {
      "pageNum": 0,
      "pageSize": 0
    }
    paperApi.paperSearchAll(formData)
      .then(res => {
        console.log(res);
        if (res.code === 200) {
          let tempList = res.data.data;
          let classList = new Array();
          for(let j = 0; j < 4; j++){
            classList[j] = new Array();
          }
          let statusWord = ["待审核", "待修改", "已通过", "已取消"];
          for(let j = 0; j < tempList.length; j++){
            let status = tempList[j].checkStatus;
            tempList[j].checkStatus = statusWord[status];
            tempList[j].payStatus = tempList[j].payStatus==0 ? "未支付" : "已支付";
            classList[status].push(tempList[j]);
          }
          for(let j = 0; j < 4; j++){
            classList[j].sort((a, b)=>{
              let date1 = new Date(a.updateTime);
              let date2 = new Date(b.updateTime);
              return date1.getTime() > date2.getTime();
            })
          }
          that.list = classList[1].concat(classList[0]).concat(classList[2]).concat(classList[3]);
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
    edit(param){
      this.$store.commit('setPaperInfo', param);
      this.$router.push('/paper');
    }
  }
}
</script>
