<template>
  <el-header height="80px" class="clearfix" :class="{is_fixed: searchBarFixed}">
        <div class="head_logo">
            <a href="javascript:;">
                <span class="logo">
                    <img src="../../assets/logo.png" width="100%" alt="">
                </span>
                <div class="logo_text">
                    <img src="../../assets/logo_name.png" width="100%" alt="">  
                    <span class="logo_ip">quantum.internmate.com</span>
                </div>
            </a>
        </div>
        <div class="head_menu clearfix"> 
            <el-menu :default-active="$route.path" v-cloak class="el-menu-demo"
                mode="horizontal"  background-color="#003265" :router="true"
                text-color="#fff"
                active-text-color="#cf6">
                <el-menu-item v-for="item in menu_routes" v-if="!username" :key="item.name" :index="item.path">
                    <span>{{item.text}}</span>
                </el-menu-item>
                <el-menu-item v-for="item in menu_routes" v-if="!!username && item.path != '/login'" :key="item.name" :index="item.path">
                    <span>{{item.text}}</span>
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
          activeMenu:'login',
          searchBarFixed: false
      }
  },
  
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    menu_routes () {
      return this.$router.options.routes[0].children
    },
    username(){
      return this.$store.state.user.user_name;  
    }
    
  },
  methods: {
    handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetTop = document.querySelector('header').offsetTop;
        //console.log(scrollTop);
        if (scrollTop > offsetTop) {
            this.searchBarFixed = true
        } else {
            this.searchBarFixed = false
        }
    },
    login_out(){
        this.$store.dispatch('login_out').then(
            () => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
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
    width: 100%;
    min-width: 1200px;
    padding:0 10px;
    overflow: hidden;
    box-shadow: 0 0 5px 0px #ccc;
    z-index: 10;
    box-shadow: none;
    transition: all .4s ease-in;
   
    .head_logo{
        float: left;
        width: 258px;
    }
    .logo_text{
        float: left;
        color: #fff;
        padding: 23px 0 0 10px;
        width: 146px;
        text-align: center;
        .logo_ip{
            font-size: 13px;
        }
    }
    
    .logo{
        width: 40px;
        height: 50px;
        float: left;
        background-size: cover;
        margin: 22px 0 0 0;
    }
}
.is_fixed{
    position:fixed;
    left:0;
    top:0;
    z-index:999;
    width: 100%;
    animation: show_header .5s;
}

@keyframes show_header{
    0%{ top:-15px; opacity: 0;}
    30%{ top:-10px; opacity: 0.5;}
    60%{ top:-5px; opacity: 0.8;}
    100%{ top:0px; opacity: 1;}

}
.head_menu{
    .el-menu--horizontal {
        float: right;
        border: none;
        li.el-menu-item{
            height: 80px;
            line-height: 80px;
        }
        li.el-menu-item:last-child{
            margin-left: 100px;
        }
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-color: transparent !important;
        background-color: transparent !important;
    } 
}

</style>

