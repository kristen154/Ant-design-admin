<template>
  <div>
    <a-tabs  type="editable-card" :active-key="activePage" :hide-add="true"
             @edit="editPage" @change="changePage"
    >
      <a-tab-pane :id="pane.fullPath" :key="pane.fullPath" v-for="pane in pageList">
        <span slot="tab" :pagekey="pane.path">{{pane.name}}</span>
      </a-tab-pane>
    </a-tabs>
    <transition name="page-toggle">
      <keep-alive>
        <v-content ></v-content>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import { asnyRouter } from '@/router.js'
  import Content from './content'
  export default{
    name:'tabMenu',
    components:{'v-content':Content},

    data(){
      return {
        panes:asnyRouter,
        pageList:[],
        linkList:[],
        activePage:'',
        menuVisible:false,
        multiPage:true,
        activeKey: asnyRouter[0].path
      }
    },
    computed:{
      mutipage(){
        return true;
      }
    },

    created(){
      this.pageList.push(this.$route)
      this.linkList.push(this.$route.fullPath)
      this.activePage = this.$route.fullPath
    },

    watch:{
      '$route': function(newRoute) {
        //console.log('route watch',newRoute.fullPath)
        this.activePage = newRoute.fullPath
        if(!this.multiPage){
          this.linkList = [newRoute.fullPath]
          this.pageList = [newRoute]
        }else if(this.linkList.indexOf(newRoute.fullPath) < 0){
          this.linkList.push(newRoute.fullPath)
          this.pageList.push(newRoute)
        }
      },
      'activePage': function(key){
        //console.log('watch',key)
        this.$router.push(key)
      },


    },
    methods:{
      editPage(key, action){
        this[action](key)
      },
      changePage (key) {
        this.activePage = key
      },
      remove(key){
        //console.log('remove',key)
        if(this.pageList.length === 1 ){
          this.$message.warning('这是最后一页，不能再关闭了啦')
          return
        }
        this.pageList = this.pageList.filter(item => item.fullPath !== key)
        let index = this.linkList.indexOf(key)
        this.linkList = this.linkList.filter(item => item !== key)
        index = index >= this.linkList.length ? this.linkList.length - 1 : index
        this.activePage = this.linkList[index]

      }
    },


  }
</script>

<style>

</style>
