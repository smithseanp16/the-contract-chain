<template>
  <div class="page-not-found full-height">
    <div>404 <br>Page Not Found </div>
    <router-link class="ffl-link" to="/">
      <div class="ffl-text">Go to Home Page</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'page-not-found',
    data() {
      return {
      }
    },
    created() {

    },
  }
</script>

<style>
  .page-not-found {
    font-size: 60px;
    color: darkred;
  }

  .ffl-link {
    font-size: 20px;
    color: red;
  }

</style>

