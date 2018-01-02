<template>
      <div class="mian_content">
        <div class="banner">
            
                <div class="banner_btn">
                    <!-- <img src="../assets/banner_text.png" width="320px" alt=""> -->
                    <div class="download_btn" @click="downLoad">
                        <a href="http://quantom.internmate.com/QuantomInstaller.exe" download="QuantomInstaller.exe">
                            <img src="../assets/banner_btn.png" width="100%" alt="">
                        </a>
                    </div>
                </div> 
          
        </div>
        <div class="intro">
           
            <el-row>
                <el-col :span="12">
                    <div>
                        <img src="../assets/wd.jpg" width="180px" alt="">
                        <div class="lz_intro_title">快速</div>
                        <p>国内多线接入顶级IDC机房</p> 
                        <p>独享专线带宽，更有海底光缆直连确保最低延迟</p>
                    </div>          
                </el-col>
                <el-col :span="12">
                    <div>
                        <img src="../assets/safe.jpg" width="180px" alt="">
                         <div class="lz_intro_title">安全</div>
                        <p>100%安全，绿色</p> 
                        <p>量子加速器界面友好一键加速</p>
                    </div>
                </el-col>
            </el-row>
           
        </div>
        
       
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
.mian_content{
    padding: 20px 0 0 0;
}
.banner{
    background: url('../assets/banner.jpg') center center no-repeat, linear-gradient(#013266, #000f20);
    //background-size: cover;
    width: 100%;
    height: 746px;
    overflow: hidden;
}
.banner_btn{
    position: absolute;
    left: 50%;
    margin-left: -145px;
    top: 600px;
    cursor: pointer;
    img{
        border-radius: 150px;
        width: 320px;
    }
}
.banner_btn img:hover{
    background: #002854;
}

.intro{
    padding: 50px 80px;
    margin: 50px 0;
}
.wd{
    display: inline-block;
    border-radius: 50%;
    width: 200px;
    height: 200px;
}

.lz_intro_title{
    font-size: 28px;
    padding: 0 25px;
}
</style>
