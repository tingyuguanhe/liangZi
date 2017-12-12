<template>
  <div class="account">
    <div class="title clearfix">
      <img src="../../assets/tit.png" width="14%" alt="">
    </div>
    
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
              <el-col :span="22">khflidfliafdsRTFWKUgdiwgf</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">登录时长：</el-col>  
              <el-col :span="22"><span class="green">180</span> 小时</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">邀请码：</el-col>  
              <el-col :span="22">abcdefgabcdefgabcdefg</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">剩余时长：</el-col>  
              <el-col :span="22"><span class="red">10</span> 小时</el-col>
            </el-row>
           
          </div>
        </el-col>
      </el-row>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 'base_info',
        menu_list:[
          {
            name:'基本信息',
            key:'base_info'
          },
          {
            name:'充值记录',
            key:'recharge_record'
          }
        ],
        active_name:''
      };
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
      }
    }
  }
</script>

<style lang="scss">
.account{
  padding: 20px;
  .title{
    img{
      float: left;
    }
  }
}
.account_menu{
  width: 240px;
  float: left;
}
.account_info{
  padding: 10px 60px;
  text-align: left;
}
.account_box{
  

}
.account_content{
  background: #fff;
  
  p{
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .el-row{
    padding: 10px;
  }
  .el-col-2{
    text-align: right;
    padding: 0 10px 0 0;
  }
  .green{
    color: #00ca00;
    font-weight: 600;
  }
  .red{
    color: #f00;
    font-weight: 600;
  }

}
</style>

