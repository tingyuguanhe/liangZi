<template>
  <footer class="footer_box">
      <el-row>
          <el-col :span="15" :offset="1">  
            <div class="footer_logo">
                <img src="../../assets/footer.png" width="100%" alt="">
            </div>      
          </el-col>
          <el-col :span="8">
              <div class="copy">技术支持&copy;量子加速器技术团队</div>
         </el-col>
      </el-row>
  </footer>
</template>
<style lang="scss">
    .footer_box{
        width: 100%;
        position: absolute;
        background: #F2F4F6;
        height: 80px;
        min-width:1200px;
        left: 0;
        bottom:0;
        .footer_logo{
            float: left;
            padding: 18px 0 0 0;
            width: 300px
        }
        .copy{
            font-size: 12px;
            line-height: 80px;
        }
    }

</style>

