<template>
    <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/">The Contract Chain</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
            <b-nav-item href="/login">Login</b-nav-item>
            <b-nav-item href="/register">Register</b-nav-item>
           <!--  <router-link class="ffl-link login" to="/login">
                Login
            </router-link>
            <router-link class="ffl-link register" to="/register">
                Register
            </router-link> -->
        <!-- Right aligned nav items <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

   
  <!--        <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
            <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
            <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>

    </b-collapse>
    </b-navbar>
</template>

<script>
    module.exports = {
        data(){
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

</style>