// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from './components/Room.vue'
import Landing from './components/Landing.vue'
// Vue.config.productionTip = false




const routes = [
  { path: '/', component: Landing },
  { path: '/room/:roomId/:userId', component: Room, props: true },
]
Vue.use(VueRouter);

const router = new VueRouter({
  routes // short for `routes: routes`
})
/* eslint-disable no-new */
const app = new Vue({
    router
}).$mount('#app')
