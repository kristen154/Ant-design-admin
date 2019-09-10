<template>
  <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
    <transition name="page-toggle">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </a-layout-content>
</template>

<script>
  const minHeight = window.innerHeight - 64 - 27 - 122
  export default{
    name:'',
    data(){
      return {
        minHeight:minHeight + 'px'
      }
    }
  }
</script>

<style>

</style>
