<template>
      <el-container>
        <el-main>
            <div class="banner_btn">
                <!-- <img src="../assets/banner_text.png" width="320px" alt=""> -->
                <div class="download_btn" @click="downLoad">
                    <a href="http://quantom.internmate.com/QuantomInstaller.exe" download="QuantomInstaller.exe">
                        <img src="../assets/banner_btn.png" width="100%" alt="">
                    </a>
                </div>
            </div>
        </el-main>
    </el-container>
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
    background: url('../assets/banner_new.png') center center no-repeat;
    position: relative;
    left: 0;
    display: block;
    background-size: cover;
    width: 100%;
    height: 746px;
    overflow: hidden;
}
.banner_btn{
    position: absolute;
    left: 50%;
    margin-left: -145px;
    top: 76%;
    cursor: pointer;
    img{
        border-radius: 150px;
        width: 320px;
    }
}
.banner_btn img:hover{
    background: #002854;
}
</style>
