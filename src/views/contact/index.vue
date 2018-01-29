<template>
  <div class="content">     
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="140px" class="contact_us demo-ruleForm">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Email：" prop="email">
                        <el-input type="text" v-model="ruleForm2.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input type="text" v-model.number="ruleForm2.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="反馈信息：" prop="content">
                        <el-input type="textarea" v-model="ruleForm2.content" :rows="10" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-upload class="upload-demo" :action="oploadFileUrl" name="file"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        :drag="true"
                        :onSuccess="uploadSuccess"
                        list-type="picture">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                       
                    </el-upload>
                </el-col>
            </el-row>
        </el-form>
   </div>
</template>

<script>
import {uploadSuggest} from '@/api/api'
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
          var reg = /^1\d{10}$/;
          var phone_flag = false;
          if(value == ''){
              return callback(new Error('请输入手机号'));
          }else{
              phone_flag = reg.test(value);
              if(phone_flag){
                  callback();
              }else{
                  return callback(new Error('请输入正确的手机号'));
              }
          }   
      }
      return {
        oploadFileUrl:'/api/upload/',
        ruleForm2: {
          name: '',
          email: '',
          phone: '',
          content:'',
          imgs:[]
        },
        
        rules2: {
          name: [
            { required: true,message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true,message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          content: [
            { required: true,message: '请输入反馈信息', trigger: 'blur' }
          ]
        },
        post_imgs_url:[],
        imgs_url:[],
        fils_list:[]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.post_imgs_url = [];
            if(this.imgs_url.length > 0){      
              for(var i = 0; i<this.imgs_url.length;i++){
                this.post_imgs_url.push(this.imgs_url[i].url);
              }
              this.ruleForm2.imgs = this.post_imgs_url;
            }

            var reqData = this.ruleForm2;
            uploadSuggest(reqData).then(
              (resData) => {
                if(resData.status == 'ok'){
                  this.$message.success(resData.message);
                }else{
                  this.$message.error(resData.message);
                }
              }
            )
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        var remove_img_uid = file.uid;
        for(var i = 0;i< this.imgs_url.length; i++){
          if(remove_img_uid == this.imgs_url[i].uid){
            //console.log(remove_img_uid);
            this.imgs_url.splice(i, 1);
          }
        }
        //console.log(this.imgs_url);
      },
      handlePreview(file) {
        //console.log(file);
      },
      handleChange(file,fileList){
        this.fils_list = fileList;
      },
      uploadSuccess (response, file, fileList) {
        if(response.status == 'ok'){  
          var index = this.fils_list.length - 1;
          this.imgs_url.push({
            uid: this.fils_list[index].uid,
            url: response.data.url
          });
        }
      }
      
    }
  }
</script>

<style>
.contact_us{
  padding: 30px 0;
}
.el-upload-list{
  margin: 0 auto;
  width: 60%;
}
</style>

