<template>
  <div class="account">
    <!-- <div class="account_menu"> 
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect" background-color="transparent" text-color="#5a5e66" active-text-color="#2d8dc5">
        <el-menu-item v-for="item in menu_list" :key="item.key" :index="item.key">{{item.name}}</el-menu-item>
      </el-menu>
    </div> -->
   
      <el-row class="account_box">
        <el-col :span="24" class="account_info">
          <div class="account_content">
            <p>{{active_name}}</p>
            <el-row>
              <el-col :span="2">用户名：</el-col>  
              <el-col :span="17">
                {{user_info.username}}
                <img src="../../assets/vip.png"  class="icon" width="32px"> 
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">登录时长：</el-col>  
              <el-col :span="17"><span class="green">0</span> 小时</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">邀请码：</el-col>  
              <el-col :span="17">
                <span v-if="user_info.invite_code" class="invite_color">{{user_info.invite_code}}</span>
                <span v-else class="invite_color">暂无</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">剩余时长：</el-col>  
              <el-col :span="17">
                <span v-if="user_info.time">{{user_info.time}} 小时</span>
                <span v-else class="red">暂无</span>
              </el-col>
            </el-row>
           
          </div>
        </el-col>
      </el-row>
    
  </div>
</template>

<script>
import {checkLogin} from '@/api/api'
  export default {
    data() {
      return {
        activeIndex: 'base_info',
        menu_list:[
          {
            name:'基本信息',
            key:'base_info'
          }
        ],
        active_name:'',
        user_info:{}
      };
    },
    created () {
      this.get_user_info();
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
              //console.log(resData.data);
              this.user_info = resData.data;
              //this.$store.dispatch('get_user_info');
            }else{
              console.log('个人信息失败，未登录');
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
  .el-row{
    padding: 10px;
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
  .green{
    color: #00ca00;
    font-weight: 600;
  }
  .invite_color{
    color:#f0f;
  }

}
</style>

