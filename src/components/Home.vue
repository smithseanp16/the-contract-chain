<template>
  <div>
    <a class="logout"
       v-on:click="logout($event)">Logout</a>
    <h1 class="header"><b>Hellowwwwww World!</b></h1>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },

    mounted() {
      let token = localStorage.getItem('token');
      if (!token || token == '') {
        this.$router.push('/')
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
  .logout {
    position: absolute;
    right: 50px;
    top: 50px;
    text-decoration: underline !important;
    font-size: 20px;
    color: red;
    cursor: pointer;
  }

  .header {
    text-align: center;
    margin-top: 200px;
    font-size: 100px;
  }
</style>
