<template>
  <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
    <router-view />
  </a-layout-content>
</template>

<script>
  const minHeight = window.innerHeight - 64 - 24 - 122
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
