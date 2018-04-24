<template>
  <div>
    <b-form @submit="onSubmit" style="width:450px; margin:auto; margin-top:120px; padding:50px; background-color:#efebeb">
      <h1 style="text-align:center; margin-bottom:20px">Signup</h1>
      <b-form-group id="usernameInputGroup">
        <b-form-input id="usernameInput"
                      type="text" v-model="form.username" required
                      placeholder="Username"
                      autocomplete="username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="emailInputGroup">
        <b-form-input id="emailInput"
                      type="email" v-model="form.email" required
                      placeholder="Email"
                      autocomplete="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="passwordInputGroup">
        <b-form-input id="passwordInput"
                      type="password" v-model="form.password" required
                      placeholder="Password"
                      autocomplete="new-password"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="confirmPasswordInputGroup">
        <b-form-input id="confirmPasswordInput"
                      type="password" v-model="form.confirm_password" required
                      placeholder="Confirm_Password"
                      autocomplete="new-password"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="exampleGroup4">
        <router-link to="/login" style="float:right">Login</router-link>
        <router-link to="/" style="float:left">Home</router-link>
      </b-form-group>
      <div class="col-sm-12" style="color: red" v-if="errorMessage">{{errorMessage}}</div>
      <b-button type="submit" variant="primary" style="width:100%">Submit</b-button>
      <b-modal id="modalsm" style="text-align:center" ref="modal" size="sm" hide-footer>
        <div style="color:#28a745; font-size:20px">
          <b>Register Successfully!</b>
        </div>
        <b-btn class="mt-3" variant="outline-success" style="float:right" @click="onClick">Login</b-btn>
      </b-modal>


    </b-form>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        errorMessage:'',
        form: {
          email: '',
          username: '',
          password: '',
          confirm_password: ''
        },

      }
    },

    mounted() {
      let token = localStorage.getItem('token');
      if (token && token != '') {
        this.$router.push('/home')
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.errorMessage='';
        //axios.post(`http://127.0.0.1:9000/api/register`, this.form)  //local setting
        axios.post(`http://52.14.177.91:3000/api/register`, this.form) //aws setting
          .then(response => {
              // JSON responses are automatically parsed.
              this.form = response.data;
              if (this.form.status === 200)
                this.$refs.modal.show()
            },
            (err) => {
              let error = err.response.data;
              this.errorMessage = error.message;
            })
          .catch(e => {
            console.log(e.message)
          })
      },
      onClick(e) {
        e.preventDefault();
        this.$router.push('/login')
      }
    }
  }
</script>


<style scoped>


  a {
    text-decoration: none;
  }

  .container {
    width: 400px;
    margin-top: 100px
  }

</style>
