<template>
  <div>
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="1">
                    <a href="javascript:;" class="logo"></a>
                </el-col>
                <el-col :span="8" :offset="15">
                     <el-menu :default-active="activeIndex2" class="el-menu-demo"
                mode="horizontal"  background-color="#fff"
                text-color="#fff"
                active-text-color="#538cc4">
                <el-menu-item index="index">首页</el-menu-item>
            </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <ul class="form_box">
                <li class="span_register">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="注册" name="register">
                             <div class="register">
                                <el-form :model="ruleFormRegister" :rules="rules" ref="ruleFormRegister" class="demo-ruleForm">
                                    <el-form-item prop="username">
                                        <el-input type="text" placeholder="量子账号" v-model="ruleFormRegister.username" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" placeholder="密码" v-model="ruleFormRegister.password" auto-complete="off"></el-input>
                                        <div class="tip">
                                            <span>密码安全程度：</span>
                                            <el-tag color="#fff" :class="{'pas_strong': lv == 1}" size="mini">弱</el-tag>
                                            <el-tag color="#fff" :class="{'pas_strong': lv == 2}" size="mini">中</el-tag>
                                            <el-tag color="#fff" :class="{'pas_strong': lv == 3}" size="mini">强</el-tag>
                                        </div>
                                    </el-form-item>
                                    <el-form-item prop="checkPass">
                                        <el-input type="password" placeholder="确认密码" v-model="ruleFormRegister.checkPass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="inviteCode">
                                        <el-input placeholder="邀请码" v-model.number="ruleFormRegister.inviteCode"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <div class="line"></div>
                                        <el-button type="primary" @click="submitFormRegister('ruleFormRegister')">注册</el-button>
                                    </el-form-item>                             
                                   <div class="register_tip">点击“注册”，即表示您愿意遵守<a href="javascript:;">《量子加速器》</a>中的所有内容</div>
                                </el-form>
                               
                            </div>

                        </el-tab-pane>
                        <el-tab-pane label="登录" name="login">
                            <div class="login">
                                <el-form :model="ruleFormLogin" :rules="rules" ref="ruleFormLogin" class="demo-ruleForm">
                                    <el-form-item prop="username">
                                        <el-input type="text" placeholder="量子账号" v-model="ruleFormLogin.username" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="login_pass">
                                        <el-input type="password" placeholder="密码" v-model="ruleFormLogin.login_pass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitFormLogin('ruleFormLogin')">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                   
                </li>  
                <li class="span_login">
                    <div class="download_btn">
                        <img src="../assets/download_btn.png" width="100%" @click="downLoad" alt="">
                    </div>
                    
                </li>  
            </ul>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import { userRegister } from '@/api/api'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleFormRegister.checkPass !== '') {
            this.$refs.ruleFormRegister.validateField('checkPass');
          } 
            
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleFormRegister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex2:'index',
        activeName:'register',
        lv:0,
        ruleFormRegister: {
          username:'',
          password: '',
          checkPass: '',
          inviteCode: '',
        },
        ruleFormLogin:{
          username:'',
          login_pass: ''
        },
        rules: {
            username:[
                { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            password: [  
                { required: true, message: '请输入密码（6～20位数字、字母、特殊符号）', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' },
                { min: 6, max: 20, message: '长度6～20位字符', trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            login_pass:[
                 { required: true, message: '请输入密码', trigger: 'blur' },
                 { min: 6, max: 20, message: '长度6～20位字符', trigger: 'blur' }
            ]
        }
      };
    },
    
    watch: {
        "ruleFormRegister.password": function(value){
            // 强：字母+数字+特殊字符   
            var high =  /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;       
            // 中：字母+数字，字母+特殊字符，数字+特殊字符  
            var middle = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;  
            // 弱：纯数字，纯字母，纯特殊字符  
            var low = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;  
            if(value.length >= 6){
                if(value.match(low)){
                    this.lv = 1;
                }
                if(value.match(middle)){
                    this.lv = 2;
                }
                if(value.match(high)){
                    this.lv = 3;
                }
            }else{
                this.lv = 0;
            }
        }
    },
   
    methods: {
      handleClick(tab, event) {
         if(tab.name == 'login'){
             this.$refs['ruleFormLogin'].resetFields();
         }else {
             this.$refs['ruleFormRegister'].resetFields();
         }
      },
      downLoad(){
          this.$message.success('下载成功');
      },
      submitFormRegister(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            var reqData = {
                username:this.ruleFormRegister.username,
                password: this.ruleFormRegister.password,
                // inviteCode: this.ruleFormRegister.inviteCode
            };
            userRegister(reqData).then(
                (resData) => {
                    console.log(resData);
                    if(resData.status == 'ok'){
                        this.$message.success('注册成功');
                    }else{
                        this.$message.error('注册失败，请稍后重试');
                    }
                   
                }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormLogin(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('登录submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>

.logo{
    display: inline-block;
    width: 44px;
    height: 44px;
    background: url('../assets/logo.png') no-repeat;
    background-size: cover;
    margin: 4px 0 0 0;
}

.el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 70px !important;
    padding:10px;
    overflow: hidden;
}
.el-main{
    background: url('../assets/bg.jpg') center center no-repeat;
    position: absolute;
    left: 0;
    top: 70px;
    display: block;
    background-size: cover;
    width: 100%;
    height: 91.4%;
    padding: 130px 0;
    overflow: hidden;
}
.tip{
    height: 24px;
    line-height: 24px;
    text-align: left;
    color: #3e3e3e;
    font-size: 12px;
    margin-top:6px;
}

.el-tabs__item{
    padding: 0 15px;
    color: #fff;
    font-size: 18px;
}
.el-tabs__active-bar,.el-tabs__nav-wrap::after{
    height: 0;
}
.el-tabs__header{
    margin: 0;
}

.el-button {
    width: 100%;
}
.el-tabs__item.is-active{
    color: #000;
    
}
.el-button--primary{
    background-color: #2c8dc6;
    border-color: #2c8dc6;
    color: #fff;
}
.el-button--primary:focus, .el-button--primary:hover{
    background-color: #309bda;
    border-color: #309bda;
}
.el-form-item__error{
    color: #e81f1f;
}
.el-form-item:nth-child(5){
    margin-bottom: 10px;
}
.pas_strong{
    background-color: #2c8dc6 !important;
    color: #fff;
}
.el-tag--mini{
    padding: 0 5%;
}

.form_box{
    position: absolute;
    top: 110px;
    left:0;
    right:0;
    width: 100%;
    min-width: 400px;
}
.form_box li{
    width: 30%;
    list-style: none;
    float: left;
}
.span_login{
    margin-left: 10%;
}
.span_register{
    margin-left: 16%;
}
.download_btn{
    max-width:220px;
    min-width:120px;
    padding: 180px 0 0 0;
}
@media screen and (max-width:600px) {
    .form_box li{
        width: 40%;
    }
    .download_btn{
        width: 80%;
        padding: 160px 0 0 0;
    }
    .span_register{
        margin-left: 0;
    }
    .span_login{
        margin-left: 16%;
    }
}
@media screen and (min-width:601px) and (max-width: 1366px) {
    .download_btn{
        width: 170px;
        padding: 170px 0 0 90px;
    }
    .span_register{
        margin-left: 10%;
    }
    .span_login{
        margin-left: 6%;
    }
}
.download_btn img:hover{
    cursor: pointer;
}
.el-menu--horizontal{
    border: none;
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-color: transparent !important;
    background-color: transparent !important;
}
.register_tip{
    font-size: 12px;
    color:#000;
}
.el-col-offset-6{
    margin-left: 21%;
}
.register_tip a{
    color:#2c8dc6;
    text-decoration: none;
}
</style>
