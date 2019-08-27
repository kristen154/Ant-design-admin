<template>
  <a-layout-sider :trigger="null"
                  collapsible
                  v-model="collapsed">
    <div class="logo"></div>
    <menu-list :defaultSelectedKeys="['1']"
      defaultOpenKeys="['sub1']"
               mode="inline"
               theme="dark"
               :inlineCollapsed="true" :menuList="asnyRouter"
    ></menu-list>
  </a-layout-sider>
</template>

<script>
  import MenuList from './menuList.js'
  import { asnyRouter } from '@/router.js'
  export default {
    name: '',
    components:{'menu-list':MenuList},
    props:['collapsed'],
    data(){
      return {
        asnyRouter
      }
    }
  };
</script>

<style leng="less" scoped>
  .logo{
    height:32px;
    background:rgba(255,255,255,.2);
    margin:16px;
  }
  .slide-fixed{
    overflow:auto;
    position:fixed;
    left:0;
    height:100vh;

  }


  .shadow{
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
  }
  .sider{
    z-index: 10;
  &.light{
     background-color: #fff;
   }
  &.dark{
     background-color: #001529;
   }
  .logo{
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all .3s;
    transition: all .3s;
    overflow: hidden;
  &.light{
     background-color: #fff;
  h1{
    color: #1890ff;
  }
  }
  &.dark{
     background-color: #002140;
  h1{
    color: #fff;
  }
  }
  h1{
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
  img{
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  }
  }
</style>
