<template>
  <div>
  <!--    <router-link class="ffl-link login" to="/login">
      Login
    </router-link>
    <router-link class="ffl-link register" to="/register">
      Register
    </router-link> -->
    <h1 class="header"><b>FAQ</b></h1>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },

    mounted() {
      let token = localStorage.getItem('token');
      if (token && token != '') {
        this.$router.push('/home')
      }
    },

    methods: {
      logout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.$router.push('/')
      },
    }
  }
</script>

<style>
  .ffl-link {
    position: absolute;
    text-decoration: underline !important;
    font-size: 20px;
    color: red;
    cursor: pointer;
    top: 50px;
  }

  .login {
    right: 50px;
  }

  .register {
    right: 120px;
  }

  .header {
    text-align: center;
    margin-top: 200px;
    font-size: 100px;
  }
</style>
