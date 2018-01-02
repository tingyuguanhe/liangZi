<template>
  <div class="recharge">
    <el-row>
      <el-col :span="24" class="recharge_info">
        <p class="title">账号充值</p>
        <el-row>
          <el-col :span="2">
            量子账号：
          </el-col>
          <el-col :span="18">
            <div>{{username}}</div> 
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">充值类型：</el-col>  
          <el-col :span="18">
            <div class="radio_btn btn_items">
              <el-radio v-model="recharge_type" label="lz_vip" border>量子VIP</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">充值时间：</el-col>  
          <el-col :span="18">
            <div class="radio_btn btn_items">
              <el-radio v-for="(item,index) in pay_items" :key="index" v-model="recharge_time" :label="item.id" border @change="change_product(item)">
                <span>{{item.time}}天</span>
                <span>{{item.money}}元</span>
              </el-radio>
            </div>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="2">充值方式：</el-col>  
          <el-col :span="18">
            <div class="radio_btn recharge_way_btn_items">
              <el-radio v-for="(item,index) in pay_types" :key="index" v-model="recharge_way" :label="item.name" border @change="change_pay_way"></el-radio>
            </div> 
          </el-col>
        </el-row>
       
        <el-row class="recharge_amount">
          <el-col :span="2" class="recharge_amount_label">充值金额：</el-col>  
          <el-col :span="18">
            <span class="red recharge_money">¥<span>{{total_price}}</span></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"></el-col>  
          <el-col :span="2">
            <el-button type="primary" @click="buy_product">立即充值</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
      <!-- 订单详情 -->
    <el-dialog title="充值订单详情" class="order_detail_dialog" :visible.sync="dialogVisible" width="50%">
      <el-row v-if="has_pay == 0" v-loading="loading" element-loading-text="订单生成中。。。">
        <el-col :span="9">
          <div style="text-align:center;">
            <img :src="order_data.scan_url" alt="二维码">
            <el-button type="primay">
              <span>{{pay_way}}扫描支付</span>
            </el-button>
          </div>
        </el-col>
        <el-col :span="15">
          <p><label>订单编号：</label>{{order_data.order_id}}</p>
          <p><label>充值账号：</label>{{order_data.customer}}</p>
          <p><label>充值时长：</label>{{order_data.time}}天</p>
          <p><label>支付金额：</label><b class="red pay_money">¥ {{order_data.money}}</b></p>
        </el-col>
      </el-row>
      <el-row v-if="has_pay == 1" class="pay_success">
        <el-col :span="24">
          您已支付成功！
        </el-col>
      </el-row>
      <el-row v-if="has_pay == 2" class="pay_fail">
        <el-col :span="24">
          支付超时，点击 <a href="javascript:;" @click="buy_product">重新支付</a>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_pay">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getProducts,buy,buyProduct} from '@/api/api'
  export default {
    data () {
      return {
        recharge_time: 1,
        recharge_type:'lz_vip',
        recharge_way:'WXPAY',
        pay_types:[],
        pay_items:[],
        total_price:'',
        dialogVisible: false, //订单弹框
        order_data:'',
        pay_way:'',
        loading: true,
        has_pay: 0,   //支付结果
        interval:'',
        username:''
      }
    },
    created () {
      this.get_products();
      this.username = sessionStorage.getItem('username');  
    },
    methods: {
      get_products(){
        
        getProducts().then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              var Data = resData.data;
              this.pay_items = Data.items;
              this.pay_types = Data.payTypes;
              if(this.pay_items.length > 0){
                this.total_price = this.pay_items[0].money;
              }
              if(this.pay_types.length > 0){
                this.pay_way = "微信"
              }
              
            }else{
              console.log('获取商品失败');
            }
              
          }
        )
      },
      buy_product(){
        this.loading = true;
        this.dialogVisible = true;
        this.order_data = '';
        var reqData = {
          pay_type: this.recharge_way,
          goods_id: this.recharge_time
        }
        buy(reqData).then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              this.order_data = resData.data;
              this.loading = false;
              this.interval = window.setInterval(this.buy_product_result, 1000*3);
            }else{
              console.log('获取价格失败');
            }
          }
        )
      },
      change_product(item){
        this.total_price = item.money;
      },
      change_pay_way(val){
        if(val == 'WXPAY'){
          this.pay_way = "微信";
        }else{
          this.pay_way = "支付宝";
        }
      },
      buy_product_result(){
        var param = {
          order_id: this.order_data.order_id
        }
        buyProduct(param).then(
          (resData) => {
            if(resData && resData.status == 'ok'){
              this.has_pay = resData.data;
              if(this.has_pay != 0){  //支付成功
                window.clearInterval(this.interval);
              }
            }else{
              window.clearInterval(this.interval);
            }
          }
        )
      },
      cancel_pay(){
        window.clearInterval(this.interval);
        this.dialogVisible = false;

      }
    }
  }
</script>
<style lang="scss">
@import url("../../style/common.css");
.recharge{
  padding: 10px 20px 20px 20px;
  min-width: 1200px;
  .recharge_info{
    padding: 0 40px 40px 40px;
    text-align: left;
    .el-row{
      padding: 10px;
    }
  }
  .title{
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .el-col-2 {
      text-align: right;
      padding: 0 10px 0 0;
      min-width: 100px;
      min-height: 30px;
  }
  
  .el-radio__input{
    display: none;
  }
  
  .radio_btn{
    margin: -9px 0 12px 0;
  }
  label[role="radio"]{
    width: 114px;
    text-align: center;
    
  }
  .btn_items{
    .el-radio.is-checked{
      background: url("../../assets/lz-all-icon.png") 99px -140px no-repeat;
    }
    label[role="radio"]:link,label[role="radio"]:visited,label[role="radio"]:hover,label[role="radio"]:active{
      border-color: #409EFF;
      background: url("../../assets/lz-all-icon.png") 99px -140px no-repeat;
    }
  } 
  
  
  .recharge_way_btn_items{
    label{
      background: url("../../assets/lz-all-icon.png") 17px -249px no-repeat;
    }
    label:nth-child(2){
      background: url("../../assets/lz-all-icon.png") 24px -199px no-repeat;
    }
    label:nth-child(3){
      background: url("../../assets/lz-all-icon.png") 16px -297px no-repeat;
    }
    .el-radio__label{
      display: none;
    }
    label[role="radio"]:hover{
      border-color: #409EFF;
    }
    
  }
  .recharge_amount_label{
      margin:4px 0 0 0;
    }
  .recharge_money{
    font-size: 22px;
    font-weight: 600;
  }
  .el-dialog__header{
    text-align: left;
  }
  .order_detail_dialog{
    text-align: left;
    p{
      label{
        color:#999;
      }
      .pay_money{
        font-size: 16px;
      }
    }
    .dialog-footer {
      button{
        width: 100px;
      }
    }
  }
  
}
.pay_success{
  color: #4fc300;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 50px;
}
.pay_fail{
  color: #f40;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 50px;
}
</style>

