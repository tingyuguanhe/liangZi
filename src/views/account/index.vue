<template>
  <div class="account">
      <el-row class="account_box">
        <el-col :span="24" class="account_info">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="userInfos">
              <div class="account_content">
                <!-- <p>{{activeName}}</p> -->
                <el-row>
                  <el-col :span="2">用户名：</el-col>  
                  <el-col :span="17">
                    {{user_info.username}}
                    <img src="../../assets/vip.png"  class="icon" width="32px"> 
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">截止日期：</el-col>  
                  <el-col :span="17"><span class="red">{{user_info.end_time}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">邀请码：</el-col>  
                  <el-col :span="17">
                    <span v-if="user_info.invite_code" class="invite_color">{{user_info.invite_code}}</span>
                    <span v-else class="invite_color">暂无</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">赠送天数：</el-col>  
                  <el-col :span="17">
                    <span>{{user_info.extra_time}} 天</span>
                  </el-col>
                </el-row>
              
              </div>
            </el-tab-pane>
            <el-tab-pane label="提现" name="moneyInfos">
              <div class="money_content">
                <p class="can_use_money">
                    可提现金额：<span class="can_get_money">{{extra_money}}</span> 元 
                </p>
                <el-form :model="cashAccountForm" :inline="true" :rules="rules" ref="cashAccountForm" label-width="110px" class="get_money_form">
                  <el-form-item label="提现方式：" prop="pay_type">
                    <el-select v-model="cashAccountForm.pay_type" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item label="账号：" prop="pay_value">
                    <el-input v-model="cashAccountForm.pay_value" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名：" prop="username">
                    <el-input v-model="cashAccountForm.username" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="cashAccountForm.phone" placeholder="请输入账号绑定的手机号"></el-input>
                  </el-form-item>
                  <el-form-item  label="图片验证码：" prop="code" class="image_code">
                      <el-input placeholder="请输入图片验证码" v-model.number="cashAccountForm.code"></el-input>                           
                      <div class="code_img">
                          <img :src="captcha_url" @click="get_captcha">
                      </div>
                      <div class="change_one">
                          <a href="javascript:;" @click="get_captcha">换一张</a>
                      </div>                
                  </el-form-item>
                  <el-form-item label="验证码：" prop="sms_code">
                    <el-input v-model="cashAccountForm.sms_code" placeholder="请输入手机验证码"></el-input>
                    <a href="javascript:;" type="primary" v-if="!sendMsgDisabled" @click="send_code()">发送手机验证码</a>
                    <a href="javascript:;" type="primary" v-if="sendMsgDisabled" :loading="true">{{time+'秒后重新获取'}}</a>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('cashAccountForm')">提现</el-button>
                    <el-button @click="resetForm('cashAccountForm')">重置</el-button>
                  </el-form-item>
                </el-form>
                <el-table :data="moneyTableData" border style="width: 100%" class="table">
                  <el-table-column
                    prop="pay_time"
                    label="提现日期"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="pay_type"
                    label="提现方式"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="提现金额"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="times"
                    label="提现">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="充值记录" name="third">
              <el-table :data="rechargeTableData" border style="width: 100%" class="table">
                  <el-table-column prop="order_id" label="订单号" width="300">
                  </el-table-column>
                  <el-table-column prop="time" label="提交日期">
                  </el-table-column>
                  <el-table-column prop="pay_type" label="支付方式">
                  </el-table-column>
                  <el-table-column label="充值金额">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.money }} 元</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.times }} 个月</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="订单状态">
                  </el-table-column>
                </el-table>
            </el-tab-pane>
          </el-tabs>
          
        </el-col>
      </el-row>

      <el-dialog  title="提示" :visible.sync="dialogVisible"  width="50%">
        <ul class="get_money_dialog">
          <li>
            <label for="">提现金额：</label>
            <span>{{extra_money}}</span>
          </li>
          <li>
            <label for="">支付宝账号：</label>
            <span>{{cashAccountForm.pay_value}}</span>
          </li>
          <li>
            <label for="">姓名：</label>
            <span>{{cashAccountForm.username}}</span>
          </li>
          
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirm_get_money">确 定</el-button>
        </span>
      </el-dialog>
    
  </div>
</template>

<script>
import {checkLogin,getMoney,getMoneyList,getSmsCode,getCaptcha,getOrderList} from '@/api/api'
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
      };

      return {
        dialogVisible: false,   //确认购买弹框
        activeName: 'userInfos',
        activeIndex: 'base_info',
        menu_list:[
          {
            name:'基本信息',
            key:'base_info'
          }
        ],
        active_name:'',
        user_info:{},
        cashAccountForm:{
          pay_type: 'ali',
          username:'',
          pay_value:'',
          phone:'',
          sms_code:'',
          code:'',
          key:''
        },
        options: [{
          value: 'ali',
          label: '支付宝'
        }],
        captcha_url:'',
        time: 180,
        sendMsgDisabled: false,
        extra_money:'',
       
        rules:{
          pay_value:[
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          username:[
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          phone:[
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkPhone, trigger:'blur'}
          ],
          code:[
            {required: true, message: '请输入图片验证码', trigger: 'blur'}
          ],
          sms_code:[
            {required: true, message: '请输入手机验证码', trigger: 'blur'}
          ]
        },
        moneyTableData:[],
        rechargeTableData:[]
      };
    },

    created () {
      this.extra_money = this.$store.state.user.extra_money;
      this.get_user_info();
      this.get_money_list();
      this.get_captcha();
      this.get_order_list();
    },
    mounted () {
        var key = this.menu_list[0].key;
        this.set_active_name(key);
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        this.set_active_name(key);
      },
      set_active_name(key){
        for(var i = 0;i<this.menu_list.length;i++){
          if(key == this.menu_list[i].key){
            this.active_name = this.menu_list[i].name;
          }
        }
      },
      get_user_info(){
        checkLogin().then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              this.user_info = resData.data;
              //this.$store.dispatch('get_user_info');
            }else{
              console.log('个人信息失败，未登录');
            }
          }
        )
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      send_code(){
        var me = this;

        if(!me.cashAccountForm.phone){
            me.$message.error('请填写手机号');
            return;
        }
        if(!me.cashAccountForm.code){
            me.$message.error('请填写图片验证码');
            return;
        }
        if(!!me.cashAccountForm.phone && !!me.cashAccountForm.code){
          var reqData = {
            phone: me.cashAccountForm.phone,
            code: me.cashAccountForm.code,
            key: me.cashAccountForm.key
          }
          getSmsCode(reqData).then(
              (resData) => {
                  if(resData && resData.status == 'ok'){
                      me.$message.success('手机验证码已下发，请注意查收');
                  }else{
                      console.log('验证码下发失败');
                  }
              }
          )
          me.sendMsgDisabled = true;
          let timer = window.setInterval(function() {
            var new_time = me.time --;
              if (new_time <= 0) {
                  me.time = 180;
                  me.sendMsgDisabled = false;
                  window.clearInterval(timer);
              }
          }, 1000);
        }
        
      },
      
      submitForm(formName) {
        if(this.extra_money > 0){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.dialogVisible = true;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else{
          this.$message.error("您的可提现金额为0");
        }
      },
      comfirm_get_money(){
        var reqData = this.cashAccountForm;
        getMoney(reqData).then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              this.dialogVisible = false;
              this.$message.success(resData.message);
              this.get_money_list();
            }else{
              this.dialogVisible = false;
              this.$message.error(resData.message);
            }
          }
        )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      get_money_list(){
        getMoneyList().then(
          (resData) =>{
            if(resData && resData.status == 'ok'){
              this.moneyTableData = resData.data;
            }else{
              console.log('获取提现记录失败');
            }
          }
        )
      },
      get_order_list(){
        getOrderList().then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              this.rechargeTableData = resData.data;
            }else{
              console.log('获取充值记录失败');
            }
          }
        )
      },
      get_captcha(){
        getCaptcha().then(
              (resData) => {
                  if(resData.status == 'ok'){
                      var Data = resData.data;
                      this.captcha_url = Data.url;
                      this.cashAccountForm.key = Data.key;
                  }else{
                      console.log('图片验证码加载失败');
                  }
              }
          )
      }

    }
  }
</script>

<style lang="scss">
@import url("../../style/common.css");
.account{
  padding: 10px 20px 20px 20px;
  min-width: 1200px;
  box-sizing: border-box;
  
}
.account_menu{
  width: 240px;
  float: left;
}
.account_info{
  padding: 0px 40px;
  text-align: left;
  margin: 20px 0 80px 0;
  .el-row{
    padding: 10px;
  }
}
.money_content{
  .el-form-item:last-child{
    display: block;
  }
  .el-input{
      width:220px;
  }
  .get_money_form{
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    padding: 20px;
  }
  .can_get_money{
    color:#25c10e;
    font-weight: 600;
    font-size: 18px;
  }
  
  .image_code{
    .el-input{
      width: 150px;
      float: left;
    }
  }
  .code_img{
    float: left;
  }
  .change_one{
    float: left;
  }
}
.account_content{
  background: #fff;
  .icon{
    vertical-align: bottom;
    margin: 0 0 0 20px;
  }
  p{
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  
  .el-col-2{
    text-align: right;
    padding: 0 10px 0 0;
    min-width: 100px;
  }
  .red{
    color: #f40;
    font-weight: 600;
  }
  .invite_color{
    color:#25c10e;
    font-weight: 600;
  }
  

}
.table{
  margin: 20px 0 0 0;
}
.el-dialog__header{
    text-align: left;
}
.get_money_dialog{
  padding-left:0; 
  li{
    text-align: left;
    list-style: none;
    height: 34px;
    line-height: 34px;
    label{
      display: inline-block;
      color:#999;
      width: 100px;
      text-align: right;
    }
  }
}
</style>

