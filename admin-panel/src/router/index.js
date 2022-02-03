import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const lazyload = (path) => {
  return () => import(`@/views/${path}`)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: lazyload('login')
  },
  {
    path: '/',
    name: 'Home',
    component: lazyload('home'),
    beforeEach: async (from, to, next) => {
      await store.dispatch('auth/fetchUserData')
      next('/')
    },
    children: [
      {
        path: '/users',
        name: 'User',
        component: lazyload('users/user')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("access_token");
  const publicPages = ["/login"];
  const notPublicPages = !publicPages.includes(to.path);
  let logged = false;
  if (session) {
    logged = true;
  }
  if (logged && !notPublicPages) {
    next("/");
  } else if (!logged && notPublicPages) {
    next("/login");
  } else {
    next();
  }
});