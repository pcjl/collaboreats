// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Room from './components/Room.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/room/:roomId/:userId',
    component: Room,
    props: true
  },
]
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
})
/* eslint-disable no-new */
const app = new Vue({
    router
}).$mount('#app')
