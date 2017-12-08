<template>
  <el-header>
    <el-row>
        <el-col :span="1">
            <a href="javascript:;" class="logo">
                <img src="../../assets/logo.png" width="100%" alt="">
            </a>
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
</template>

<script>
export default {
  data(){
      return{
          activeIndex2:'index',
      }
  }
}
</script>

<style lang="scss">
.logo{
    display: inline-block;
    width: 44px;
    height: 44px;
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
</style>

