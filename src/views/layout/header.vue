<template>
    <a-layout-header style="background:#fff; padding:0">
      <a-icon class="trigger" :style="{ fontSize: '18px' ,lineHeight: '64px', padding: '0 24px', cursor: 'pointer'}"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="transCellapsed"
              />
    </a-layout-header>
</template>

<script>
  export default {
    name: '',
    props:['collapsed'],
    methods:{
      transCellapsed() {
        this.$emit('transCellapsed')
      }
    }
  };
</script>

<style leng="less" scoped>

</style>
