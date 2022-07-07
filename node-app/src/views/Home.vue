<template>
  <div class='home'>
    用户名 <input type='text' v-model='form.username' /><br />
    秘密码 <input type='password' v-model='form.password' /><br />
    <button @click='login'>登录</button>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Home',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios
        .get('http://127.0.0.1:3000/login', {
          params: this.form
        })
        .then((res) => {
          alert(res.data.msg)
          this.$router.push('about')
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    }
  }
}
</script>
<style>
* {
  margin: 5px;
  padding: 5px;
}
button {
  width: 50px;
  height: 30px;
}
</style>