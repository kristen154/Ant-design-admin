<template>
  <div>
    <div id="components-layout-basic">
      <a-layout>
        <v-side :collapsed="collapsed"></v-side>
        <a-layout>
          <v-header :collapsed="collapsed"
                  @transCellapsed="transCellapsed"
          ></v-header>
          <v-tabMenu></v-tabMenu>
          <v-footer></v-footer>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>


<script>
  import Header from './header.vue'
  import Side from './side'
  import Footer from './footer'
  import TabMenu from './tabMenu'
  export default{
    name:'',
    components: {
      'v-header': Header,
      'v-side': Side,
      'v-tabMenu' :TabMenu,
      'v-footer': Footer
    },
    data(){
      return {
        collapsed:false
      }
    },
    methods:{
      transCellapsed(){
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

