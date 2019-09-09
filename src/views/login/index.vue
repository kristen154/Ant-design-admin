<template>
  <div class="container">
    <a-form id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
            >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {rules:[{required: true, message: 'Please input username'}]}
          ]"
          placeholder="Username"
          >
          <a-icon slot="prefix"
                  type="user"
                  style="color: rgba(0,0,0,.25)"
                  />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {rules: [{required: true, message: 'Please input password'},{min:3,message:'lager than'}]}
          ]"
          placeholder="password"
          >
        <a-icon slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
        />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            }
          ]"
          >
          Remember me
        </a-checkbox>
        <a class="login-form-forget"
           href="">
          Forgot password
        </a>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          >
          Login in
        </a-button>
        OR
        <a href="">register now</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    beforeCreate(){
      this.form = this.$form.createForm(this);
    },
    methods: {
      handleSubmit(e){
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if(!err) {
            this.logging = true
            console.log('Received values of form： ', values);
            this.$store.dispatch('user/login',values).then(()=>{
              this.$router.push({ path: this.redirect || '/'})
              this.loading = false
            }).catch(()=>{
              this.loading = false;
            })
          }else{
            console.log('error submit!!')
            return false;
          }
        })
      }
    }
  };
</script>

<style leng="less" scoped>
  .container{
    display:flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    justify-content: center;
    align-items: center;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    #components-form-demo-normal-login  {
      flex: 1;
      max-width: 300px;

      .login-form-button {
        width: 100%;
      }
    }
  }

</style>

