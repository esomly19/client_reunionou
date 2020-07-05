import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Event from '../components/Event.vue'
import Connexion from "../components/Connexion.vue"
import CreerCompte from "../components/CreerCompte.vue"
import LEvent from '../components/ListEvents.vue'
import Detail from '../components/Detail.vue'
import Participe from '../components/Participe.vue'
import Profil from '../components/profil.vue'
import infoevent from '../components/infoevent.vue'
import Modif from '../components/Modif.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: "/connexion", component: Connexion, meta: { guest: true } },
  { path: "/creerCompte", component: CreerCompte, meta: { guest: true } },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/levent',
    name: 'Levent',
    component: LEvent, meta: { guest: true }
  },
  {
    path: '/event',
    name: 'Evenement',
    component: Event, meta: { requiresAuth: true }
  },
  {
    path: '/event/:token',
    name: 'detail',
    component: Detail, meta: { guest: true }
  },
  {
    path: '/infoevent',
    name: 'infoevent',
    component: infoevent, meta: { guest: true }
  },
  {
    path: "/Modif:event",
    name: 'Modif',
    component: Modif,
    meta: { requiresAuth: true }
  },
  {
    path: '/evenement/:token',
    name: 'participe',
    component: Participe, meta: { guest: true }
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    console.log("authentification requise")
    console.log(localStorage.getItem('jwt'))
    if (!localStorage.getItem('jwt')) {
      console.log("redirection à la connection")
      next('/connexion')
    } else {
      console.log("pas de redirection")
      next()
    }
  } else {
    next()
  }
})


export default router
