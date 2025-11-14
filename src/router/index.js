import { createRouter, createWebHistory } from 'vue-router';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
