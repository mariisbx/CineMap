import { createRouter, createWebHistory } from 'vue-router'
import DetalhesFilmesView from '@/views/DetalhesFilmesView.vue'
import DetalhesAtoresView from '@/views/DetalhesAtoresView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'filmes',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/atores',
    name: 'atores',
    component: () => import('../views/ActorsView.vue'),
  },
  {
    path: '/cinemap',
    name: 'CineMap',
    component: () => import('../views/CineMapView.vue'),
  },
  {
    path: '/filmes/:movieId',
    name: 'DetalhesFilmes',
    component: DetalhesFilmesView,
    props: true,
  },
  {
    path: '/atores/:atorId',
    name: 'DetalhesAtor',
    component: DetalhesAtoresView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

