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
            <el-menu :default-active="$route.path" class="el-menu-demo" @select="selectMenu"
                mode="horizontal"  background-color="#003265" :router="true"
                text-color="#fff"
                active-text-color="#d1ff00">
                <el-menu-item v-for="item in menu_routes" :key="item.name" :index="item.path" >{{item.text}}</el-menu-item>
            </el-menu>
        </div>
</el-header>
</template>

<script>
export default {
  data(){
      return{
          activeMenu:'index',
      }
  },
  created () {
  },
  computed: {
    menu_routes () {
      return this.$router.options.routes[0].children
    }
  },
  methods: {
      selectMenu(index,indexPath){
          this.activeMenu = index;
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

