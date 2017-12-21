<template>
  <div>
      <nav-bar></nav-bar>
      <transition name="el-fade-in-linear">
          <router-view></router-view>
      </transition>
      <btm></btm>
  </div>
</template>
<script>
import navBar from '@/views/layout/nav_bar'
import btm from '@/views/layout/bottom'
export default {
  components: {navBar,btm}
}
</script>

