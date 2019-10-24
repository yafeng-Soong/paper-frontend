<template>
  <div>
    <v-card class="box-card">
      <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="250px" style=""></v-img> 
      <div>
        <div
          style="position: relative;position: absolute;top: 150px;left: 10px;z-index: 1;">
          <el-upload
            class="head-img-box"
            accept="image/jpeg,image/png,image/jpg"
            action=""
            :http-request="uploadImg"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <div class="upload-box">
              <div class="upload-content">
                <i class="el-icon-picture avatar-uploader-icon"></i>
                <div style="opacity: 1;font-size: 16px">上传新头像</div>
              </div>
            </div>
            <img v-show="headImgUrl" :src="headImgUrl" class="head-image">
          </el-upload>
        </div>
        <div class="info-content">
          <div class="info-content-header">
            <div v-show="!showEdits[editType.username]" @mouseover="showEditIcon(editType.username)" @mouseout="hiddenEditIcon(editType.username)">
              <h1>{{userInfo.username}}</h1>
              <i v-show="showIcons[editType.username]" @click="showEditor(editType.username)" class="el-icon-edit">修改</i>
            </div>
            <div  class="field" v-show="showEdits[editType.username]">
              <h2 class="field-label">用户名</h2>
              <div class="field-editor">
                <el-form>
                  <el-form-item>
                    <el-input v-model="newValues[editType.username]" placeholder="输入新的用户名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="confirmEdit(editType.username)">确认</el-button>
                    <el-button  @click="cancelEdit(editType.username)">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <el-button v-show="hasChanged" class="save-button" @click="updateInfo" type="primary" plain="">
              提交修改<i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </div>
          <div class="info-content-body">
            <div class="field" @mouseover="showEditIcon(editType.sex)" @mouseout="hiddenEditIcon(editType.sex)">
              <h2 class="field-label">性别</h2>
              <div v-show="!showEdits[editType.sex]" class="field-content" >
                {{userSex}}
                <i v-show="showIcons[editType.sex]" @click="showEditor(editType.sex)" class="el-icon-edit">修改</i>
              </div>
              <div v-show="showEdits[editType.sex]" class="field-editor">
                <el-form>
                  <el-form-item>
                    <el-radio v-model="newValues[editType.sex]" :label=0>男</el-radio>
                    <el-radio v-model="newValues[editType.sex]" :label=1>女</el-radio>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="confirmEdit(editType.sex)">确认</el-button>
                    <el-button  @click="cancelEdit(editType.sex)">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="field">
              <h2 class="field-label">邮箱</h2>
              <div class="field-content">{{userInfo.email}}</div>
            </div>
            <div class="field" @mouseover="showEditIcon(editType.signature)" @mouseout="hiddenEditIcon(editType.signature)">
              <h2 class="field-label">个人简介</h2>
              <div v-show="!showEdits[editType.signature]" class="field-content">
                {{userInfo.signature}}
                <i v-show="showIcons[editType.signature]" @click="showEditor(editType.signature)" class="el-icon-edit">修改</i>
              </div>
              <div v-show="showEdits[editType.signature]" class="field-editor">
                <el-form>
                  <el-form-item>
                    <el-input v-model="newValues[editType.signature]" placeholder="添加简介"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="confirmEdit(editType.signature)">确认</el-button>
                    <el-button  @click="cancelEdit(editType.signature)">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="field">
              <h2 class="field-label">余额</h2>
              <div class="field-content">{{userInfo.cash}}</div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
  import userApi from "@/api/userApi.js"
  export default {
    name: "ModifyInfo",
    inject: ['reload'],
    data(){
      return{
        userInfo: null,
        hasChanged: false,//绑定到提交修改按键，只有出现数据改动时才显示
        showUpload: null,
        showIcons: {"username":false,"sex":false,"signature":false},
        showEdits: {"username":false,"sex":false,"signature":false},
        newValues: {"username":null,"sex":null,"signature":null},
        updateValyes: {},
        editType: {username:'username',sex:'sex',signature:'signature'}
      }
    },
    created(){
      this.userInfo = this.$store.getters.getCurrentUser
      this.newValues['username'] = this.userInfo.username
      this.newValues['sex'] = this.userInfo.sex
      this.newValues['signature'] = this.userInfo.signature 
    },
    mounted(){
      this.userInfo = this.$store.getters.getCurrentUser
      this.newValues['username'] = this.userInfo.username
      this.newValues['sex'] = this.userInfo.sex
      this.newValues['signature'] = this.userInfo.signature
    },
    computed:{
      headImgUrl: function () {
        return this.$store.getters.getBaseUrl+this.$store.getters.getCurrentUser.avatar
      },
      userSex: function () {
        return this.newValues['sex'] === 1 ? '女' : '男'
      }
    },
    methods:{
      showEditIcon(type){
        this.showIcons[type] = true;
      },
      hiddenEditIcon(type){
        this.showIcons[type] = false;
      },
      showEditor(type){
        this.showEdits[type] = true;
      },
      confirmEdit(type){
        this.hasChanged = true
        this.showEdits[type] = false
        this.userInfo[type] = this.newValues[type]
        this.updateValyes[type] = this.newValues[type]
      },
      cancelEdit(type){
        this.showEdits[type] = false;
        this.newValues[type] = this.userInfo[type];
      },
      updateInfo(){
        let that = this
        userApi.updateUserInfo(that.updateValyes)
          .then(res => {
            if (res.code === 200) {
              this.$store.commit('SET_CURRENT_USER', res.data)
              this.$toast.success(res.msg)
            }else{
              this.$toast.error(res.msg)
              setTimeout(() => {
                window.location.reload()
              }, 1200)
            }
          })
          .catch(err => {
            console.log("修改用户信息失败")
            console.log(err)
            setTimeout(() => {
              window.location.reload()
            } ,1200)
          })
        that.hasChanged = false;
      },
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$toast.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      uploadImg(param){
        // let that = this
        const formData = new FormData()
        formData.append('img', param.file)
        userApi.uploadHeadImage(formData).then(res => {
          console.log(res.msg)
          if (res.code === 200){
            this.$store.commit('SET_CURRENT_USER', res.data)
            this.$toast.success('上传头像成功')
          }else {
            this.$toast.error(res.msg)
          }
          setTimeout(() => {
            window.location.reload()
          }, 1200)
        }).catch(res => {
          console.log('头像上传失败')
          console.log(res)
          setTimeout(() => {
            window.location.reload()
          }, 1200)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

  .box-card >>> .el-card__header{
    padding: 0;
  }
  .box-card >>> .el-card__body{
    position: relative;
    margin: 0 20px 24px;
  }
  .el-input{
    width: 400px;
  }
  .box-card{
    // width: 100%;
    margin: 10px auto;

    /*公共部分*/
    .field-editor{
      font-size: 16px;
      padding: 0 64px 0 140px;
    }
    .field-label{
      position: absolute;
      font-size: 20px;
      font-weight: 600;
      line-height: 36px;
      color: #444;
    }
    i{
      margin-left: 16px;
      color: #175199;
    }
    /*公共部分结束*/

    .head-img-box{
      position: relative;
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
      background-color: #fff;
      border: 4px solid #fff;
      border-radius: 8px;
      .head-image{
        width: 160px;
        height: 160px;
      }
      .upload-box {
        position: absolute;
        border-radius: 8px;
        background: #444444;
        opacity: 0;
        width: 160px;
        height: 160px;
        text-align: center;
        transition: opacity 0.5s;
        &:hover{
          opacity: 0.8;
        }
        .upload-content{
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 5;
          color: #fff;
          text-align: center;
          transform: translate(-50%,-50%);
          .avatar-uploader-icon{
            margin-left: 0;
            opacity: 1;
            color: azure;
            font-size: 50px;
            display: block;
          }
        }
      }
    }
    .info-content{
    //   margin-top: -15px;
      padding-left: 40px;
      padding-right: 106px;
      border-left: 144px solid transparent;
      .info-content-header{
        position: relative;
        margin-bottom: 16px;
        font-size: 18px;
        .save-button{
          position: absolute;
          top: 0;
          right: 0;
        }
        h1{
          display: inline-block;
          max-width: 400px;
        }
        .field{
          padding: 30px 0;
        }
      }

      .info-content-body{
        padding-bottom: 80px;
        .field {
          padding: 30px 0;
          border-bottom: 1.5px solid #ebebeb;
          .field-content {
            font-size: 18px;
            padding: 0 64px 0 140px;
            line-height: 36px;
          }
        }
      }
    }

  }

</style>
