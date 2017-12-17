<template>
  <el-header height="80px" class="clearfix">
        <div class="head_logo">
            <a href="javascript:;">
                <span class="logo">
                    <img src="../../assets/logo.png" width="100%" alt="">
                </span>
                <div class="logo_text">
                    <img src="../../assets/logo_name.png" width="100%" alt="">  
                    <span class="logo_ip">quantom.internmate.com</span>
                </div>
            </a>
        </div>
        <div class="head_menu clearfix"> 
            <el-menu :default-active="activeIndex" class="el-menu-demo" @select="selectMenu"
                mode="horizontal"  background-color="#003265" :router="true"
                text-color="#fff"
                active-text-color="#d1ff00">
                <el-menu-item v-for="item in menu_routes" v-if="!username" :key="item.name" :index="item.path" >
                    <span>{{item.text}}</span>
                </el-menu-item>
                <el-menu-item v-for="item in menu_routes" v-if="!!username" :key="item.name" :index="item.path" >
                    <span v-if="item.path != '/login'">{{item.text}}</span>
                </el-menu-item>
                <el-menu-item index="" v-if="!!username" @click="login_out">
                    <span>退出</span>
                </el-menu-item>
               
            </el-menu>
            
        </div>
</el-header>
</template>

<script>
import {loginOut} from '@/api/api'
export default {
  data(){
      return{
          activeMenu:'index'
      }
  },
  computed: {
    menu_routes () {
      return this.$router.options.routes[0].children
    },
    activeIndex(){
        return this.$route.matched[1].path;
    },
    username(){
        return this.$store.state.user.user_name;
    }
  },
  methods: {
    selectMenu(index,indexPath){
        this.activeMenu = index;
    },
    login_out(){
        loginOut().then(
            (resData) => {
                if(resData && resData.status == 'ok'){
                    window.location.href = '/';
                }else{
                    console.log('退出失败');
                }
            }
        )
    }
  }
}
</script>

<style lang="scss">


.el-header{
    background-color: #003265;
    color: #333;
    text-align: center;
    
    padding:0 10px;
    overflow: hidden;
    box-shadow: 0 0 5px 0px #ccc;
    z-index: 10;
    transition: all .4s ease-in;
    .head_logo{
        float: left;
        width: 258px;
    }
    .logo_text{
        float: left;
        color: #fff;
        padding: 16px 0 0 10px;
        width: 160px;
        text-align: center;
        
        .logo_ip{
            font-size: 14px;
        }
    }
    
    .logo{
        width: 50px;
        height: 50px;
        float: left;
        background-size: cover;
        margin: 14px 0 0 0;
    }
}
.head_menu{
    .el-menu--horizontal {
        float: right;
        border: none;
        li.el-menu-item{
            height: 80px;
            line-height: 80px;
        }
        li.el-menu-item:nth-child(3){
            margin-left: 100px;
        }
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-color: transparent !important;
        background-color: transparent !important;
    } 
}

</style>

