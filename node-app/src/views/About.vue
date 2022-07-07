<template>
  <div>
    用户名:<input type='text' v-model='form.username' /><br />
    新密码:<input type='text' v-model='form.newPassword' /><br />
    新密码:<input type='text' v-model='form.rePassword' /><br />
    <button @click='update'>确认</button>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      form: {
        username: '',
        newPassword: '',
        rePassword: ''
      }
    }
  },
  methods: {
    update() {
      if (
        this.form.username == '' ||
        this.form.newPassword == '' ||
        this.form.rePassword == ''
      ) {
        alert('数据不能为空')
        return
      }
      console.log('this.form', this.form)
      axios
        .post(
          'http://127.0.0.1:3000/updatePassword',
          {},
          {
            params: this.form
          }
        )
        .then((res) => {
          alert(res.data.msg)
          this.$router.push('/')
          alert('修改密码后请重新登录')
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    }
  }
}
</script>

<style>
</style>
