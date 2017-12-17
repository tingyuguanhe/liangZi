<template>
  <div>
      <ul class="form_box">
        <li class="login_reg_banner">
            <div>
                <img src="../../assets/login_banner_title.png" width="50%" @click="downLoad" alt="">
            </div>
            <div>
                <img src="../../assets/banner_text.png" width="40%" alt="">
            </div>
            <div>
                <a href="http://quantom.internmate.com/QuantomInstaller.exe" download="QuantomInstaller.exe">
                    <img src="../../assets/new_down.png" width="28%">
                </a>
            </div>
            <div>
                <img src="../../assets/login_banner.png"  width="95%" alt="">
            </div>
            <span class="download_btn"></span>
        </li>  
        <li class="span_register">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="注册" name="register">
                        <div class="register">
                        <el-form :model="ruleFormRegister" :rules="rules" ref="ruleFormRegister" class="demo-ruleForm">
                            <el-form-item prop="username">
                                <el-input type="text" placeholder="量子账号（手机号）" v-model.trim="ruleFormRegister.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" placeholder="密码" v-model.trim="ruleFormRegister.password" auto-complete="off"></el-input>
                                <div class="tip">
                                    <span>密码安全程度：</span>
                                    <el-tag color="#fff" :class="{'pas_strong': lv == 1}" size="mini">弱</el-tag>
                                    <el-tag color="#fff" :class="{'pas_strong': lv == 2}" size="mini">中</el-tag>
                                    <el-tag color="#fff" :class="{'pas_strong': lv == 3}" size="mini">强</el-tag>
                                </div>
                            </el-form-item>
                            <el-form-item prop="checkPass">
                                <el-input type="password" placeholder="确认密码" v-model.trim="ruleFormRegister.checkPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="sms_code" class="phone_check_code">
                                <el-input placeholder="手机验证码" v-model.number="ruleFormRegister.sms_code"></el-input>
                                <el-button type="primary" @click="get_sms_code">获取手机验证码</el-button>
                            </el-form-item>
                            <el-form-item prop="invite_code">
                                <el-input placeholder="邀请码（选填）" v-model.number="ruleFormRegister.invite_code"></el-input>
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
                                <el-input type="text" placeholder="量子账号" v-model.trim="ruleFormLogin.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="login_pass">
                                <el-input type="password" placeholder="密码" v-model.trim="ruleFormLogin.login_pass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitFormLogin('ruleFormLogin')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
            
        </li>  
        
    </ul>
  </div>
</template>

<script>
import {bannerUrl} from '@/config'
import { userRegister,getSmsCode,userLogin } from '@/api/api'
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
        activeName:'register',
        lv:0,
        ruleFormRegister: {
          username:'',
          password: '',
          checkPass: '',
          invite_code: '',
          sms_code:'',
        },
        ruleFormLogin:{
          username:'',
          login_pass: ''
        },
        rules: {
            username:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                {validator: checkPhone, trigger:'blur'}
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
            ],
            sms_code: [
                { required: true, message: '请输入手机验证码', trigger: 'blur' },
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
      //注册
      submitFormRegister(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            var reqData = {
                user:{
                    username:this.ruleFormRegister.username,
                    password: this.ruleFormRegister.password
                },
                sms_code: this.ruleFormRegister.sms_code,
                invite_code: this.ruleFormRegister.invite_code
            };
            userRegister(reqData).then(
                (resData) => {
                    console.log(resData);
                    if(resData.status == 'ok'){
                        //this.$store.dispatch('get_user_info');
                        this.$router.push({name:'account'});
                    }else{
                        this.$message.error(resData.message);
                    }
                }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //获取手机验证码
      get_sms_code(){
        if(!!this.ruleFormRegister.username){
            var param = {
                phone_num: this.ruleFormRegister.username
            }
            getSmsCode(param).then(
                (resData) => {
                    console.log('手机验证码',resData);
                }
            )
        }else{
            this.$message.error('请填写手机号');
        }
      },
      //登录
      submitFormLogin(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
              var reqData = {
                username:this.ruleFormLogin.username,
                password: this.ruleFormLogin.login_pass
            };
            userLogin(reqData).then(
                (resData) => {
                    if(resData && resData.status == 'ok'){
                        //this.$store.dispatch('get_user_info');
                        this.$router.push({name:'account'});
                    }else{
                        this.$message.error(resData.message);
                    } 
                }
            )
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>


<style lang="scss">
@import url("../../style/common.css");
.tip{
    height: 24px;
    line-height: 24px;
    text-align: left;
    color: #969696;
    font-size: 12px;
    margin-top:6px;
}
.phone_check_code{
   .el-input{
       width: 50%;
       float: left;
   }
   .el-button{
       float: left;
       width: 45%;
       margin: 0 0 0 5%;
   }
}
.login_reg_banner {
    min-width: 300px;
    >div:nth-child(2){
        margin: 20px 0;
    }
}
.el-tabs__item{
    padding: 0 15px;
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
    min-width: 400px;
}
.form_box li{
    width: 40%;
    list-style: none;
    float: left;
}
.form_box li:first-child{
    width: 50%;
    min-width: 500px;
    margin: 18px 0 0 0;
    position: relative;
}
.span_register{
    margin-left: 5%;
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
