<template>
  <div class="hello">
    <a-button size="small" @click="change">{{this.$store.state.name}}</a-button>
  </div>
</template>

<script>
  import {URLPATH} from '@/requrl.js'
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    methods:{
      change(){
        console.log(URLPATH)
        this.$axios.get(URLPATH.LOGIN).then(res=>{
          console.log('ds')
        })
        this.$store.dispatch('changeName',{key:'name',value: '广东'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
