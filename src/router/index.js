import { createRouter, createWebHistory } from 'vue-router';
import DetalhesFilmesView from '@/Views/DetalhesFilmesView.vue';
import DetalhesAtoresView from '@/Views/DetalhesAtoresView.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;