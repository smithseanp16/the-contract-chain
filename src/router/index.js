import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Index from '@/components/Index'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Start from '@/components/Start'
import PageNotFound from '@/components/page-not-found'

Vue.use(Router);

export default new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/start',
      name: 'Start',
      component: FAQ
    },
    {path: "*", component: PageNotFound}
  ]
})
