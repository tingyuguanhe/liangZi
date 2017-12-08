<template>
  <div>
      <nav-bar></nav-bar>
      <transition name="el-fade-in-linear">
          <router-view></router-view>
      </transition>
  </div>
</template>
<script>
import navBar from '@/views/layout/nav_bar'
export default {
  components: {navBar}
}
</script>

