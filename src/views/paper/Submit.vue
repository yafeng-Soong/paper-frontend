<template>
    <div>
    <el-card>
      <el-form :rules="rules" label-width="180px" :model="paper" ref="ruleForm" style="width:80%;margin: 5% auto">
        <el-form-item label="上传论文" prop="paperfile">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            accept="application/msword, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            :auto-upload="false"
            :limit="1"
            :http-request="uploadPaper"
            :on-exceed="handleExceed"
            :before-upload="beforePaperUpload"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitPaperUpload">上传文件</el-button>
            <div class="el-upload__tip" slot="tip">注意！只能上传一份doc文件(20M以内)，选取文件后点击上传</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="论文标题" prop="name">
          <el-input v-model="paper.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="paper.author"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="paper.keyword"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input :rows="6" type="textarea" v-model="paper.summary"></el-input>
        </el-form-item>
        <el-form-item label="其他说明">
          <el-input :rows="2" type="textarea" v-model="paper.note"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button v-if="!isUpdate" type="primary" @click.prevent="submit('ruleForm')">提交</el-button>
          <el-button v-if="isUpdate" type="warning" @click.prevent="update('ruleForm')">更新</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import paperApi from "@/api/paperApi.js"

export default {
  name: 'Submit',
  components: {
  },
  data(){
    return {
      isUpdate: false,
      paper: {
        id: '',
        filePath: '',
        keyword: '',
        name: '',
        note:'',
        summary: '',
        author: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入论文标题', trigger: 'blur'}
        ],
        keyword: [
          {required: true, message: '请输入关键字', trigger: 'blur'}
        ],
        summary: [
          {required: true, message: '请输入摘要', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请输入作者', trigger: 'blur'}
        ]
      }
    }
  },
  mounted: function () {
    this.paper.id = this.$route.params.paperId;
    if(this.paper.id != undefined){
      this.isUpdate = true;
      let paperInfo = this.$store.getters.getPaperInfo;
      if(paperInfo.id === this.paper.id){
        this.paper.filePath = paperInfo.filePath;
        this.paper.author = paperInfo.author;
        this.paper.keyword = paperInfo.keyword;
        this.paper.name = paperInfo.name;
        this.paper.summary = paperInfo.summary;
      }
      else{
        this.$message.error("更新出错，请重试");
      }
    }
  },
  methods:{
    uploadPaper(param) {
      let that = this;
      const formData = new FormData();
      formData.append('file', param.file);
      paperApi.paperFileUpload(formData)
        .then(res => {
          if (res.code === 200) {
            console.log('上传论文成功！');
            that.$message.success("上传论文成功！");
            that.paper.filePath = res.data;
          }else{
            console.log('上传论文失败！');
          }
        })
        .catch(err => {
          console.log('网络错误！'+err);
          that.$message.error(err);
        })
    },
    handleExceed(){
      this.$message.error("最多只能上传一份论文！");
    },
    submitPaperUpload(){
      this.$refs.upload.submit();
    },
    submit(formName){
      let that = this;
      if (!that.paper.filePath){
        that.$message.error("请上传论文");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!that.paper.note){
            that.paper.note = "null";
          }
          paperApi.paperSubmit(that.paper)
            .then(res => {
              if (res.code === 200){
                that.$alert(res.data, '提交成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    that.$router.replace('/home');
                  }
                });
              }else {
                this.$toast.error(res.data)
              }
            })
            .catch(err => {
              that.$message.error(err);
            })
        } else {
          this.$message.error("请输入必填字段");
          return false;
        }
      })
    },
    update(formName){
      let that = this;
      if (!that.paper.filePath){
        that.$message.error("请上传论文");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!that.paper.note){
            that.paper.note = "null";
          }
          paperApi.paperUpdate(that.paper)
            .then(res => {
              if (res.code === 200){
                that.$alert(res.data, '更新成功', {
                  confirmButtonText: '确定',
                  callback: () => {
                    that.$router.replace('/home');
                  }
                });
              }else {
                this.$toast.error(res.data)
              }
            })
            .catch(err => {
              that.$message.error(err);
            })
        } else {
          this.$message.error("请输入必填字段");
          return false;
        }
      })
    },
    cancel(){
      let that = this;
      this.$confirm('是否放弃提交?', '取消', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$router.replace('/home');
        });
    },
    beforePaperUpload(file){
      const isLt15M = file.size / 1024 / 1024 < 15;
      if (!isLt15M) {
        this.$message.error('上传论文大小不能超过15MB!');
      }
      return isLt15M;
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-form-item{
    width: 700px;
  }
</style>
