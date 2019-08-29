<script>
  export default {
    beforeCreate(){
      const { params, query } = this.$route
      const { path } = params
      this.$router.replace({
        path: '/' + path, query
      }).catch(err => { console.log(err) })
    },
    render: function(h){
      return h()
    }
  }
</script>
