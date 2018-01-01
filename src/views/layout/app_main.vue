<template>
  <div class="app_main">
      <nav-bar></nav-bar>
      <transition name="fade" mode="out-in">
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



