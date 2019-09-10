<template>
  <a-layout-content :style="{minHeight: minHeight}">
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

<style scoped>

</style>
