import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../Views/HomeView.vue'),
    },
     {
        path: '/filmes',
        name: 'filmes',
        component: () => import('../Views/MoviesView.vue'),
    },
    {
        path: '/atores',
        name: 'atores',
        component: () => import('../Views/ActorsView.vue'),
    },
    {
        path: '/cinemap',
        name: 'CineMap',
        component: () => import('../Views/CineMapView.vue'),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;