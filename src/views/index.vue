<template>
  <div>
      <el-container>
        <el-main>
            <div class="banner_text">
                <img src="../assets/banner_text.png" width="320px" alt="">
                <div class="download_btn" @click="downLoad">
                    <img src="../assets/new_down.png" width="250px" alt="">
                </div>
            </div>
            
        
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        downLoad(){

        }
    }
}
</script>

<style lang="scss">
@import url("../style/common.css");
.el-main{
    background: url('../assets/new_bg.png') center center no-repeat;
    position: absolute;
    left: 0;
    top: 80px;
    display: block;
    background-size: cover;
    width: 100%;
    height: 766px;
    padding: 130px 0;
    overflow: hidden;
}
.banner_text{
    margin: 50px 0;
    position: absolute;
    left: 50%;
    >img{
        width: 320px;
    }
}
.download_btn{
    margin: 50px 0;
}
</style>
