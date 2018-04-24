<template>
  <div>
    <b-form @submit="onSubmit"
            style="width:450px; margin:auto; margin-top:120px; padding:50px; background-color:#efebeb">
      <h1 style="text-align:center; margin-bottom:20px">Login</h1>
      <b-form-group id="exampleInputGroup1">
        <b-form-input id="exampleInput1"
                      type="text" v-model="form.username" required
                      placeholder="Username"
                      autocomplete="username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2">
        <b-form-input id="exampleInput2"
                      type="password" v-model="form.password" required
                      placeholder="Password"
                      autocomplete="current-password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="exampleGroup4">
        <router-link to="/register" style="float:right">Register</router-link>
        <router-link to="/" style="float:left">Home</router-link>
      </b-form-group>

      <div class="col-sm-12" style="color: red" v-if="errorMessage">{{errorMessage}}</div>
      <b-button type="submit" variant="primary" style="width:50%">Submit</b-button>
      <b-button type="reset" variant="secondary" style="width:48%">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        errorMessage: '',
        form: {
          username: '',
          password: ''
        }
      }
    },
    mounted() {
      let token = localStorage.getItem('token')
      if (token && token != '') {
        this.$router.push('/home')
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        // this.$router.push('/home')
        this.errorMessage = "";
        //axios.post(`http://127.0.0.1:9000/api/login`, this.form) //local setting
        axios.post(`http://52.14.177.91:3000/api/login`, this.form) //aws setting
          .then(response => {
              // JSON responses are automatically parsed.
              this.form = response.data
              localStorage.setItem('token', response.data.token);
              this.$router.push('/home')
            },
            (err) => {
              let error = err.response.data;
              this.errorMessage = error.message;
            })
          .catch(e => {
            console.log(e.response)
          })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
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
    text-decoration: none;
  }

  .container {
    width: 400px;

  }


</style>
