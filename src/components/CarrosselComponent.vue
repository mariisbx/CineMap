<script setup>
import { useTendenciasStore } from '@/stores/tendencias';
import { onMounted, computed } from 'vue';

const store = useTendenciasStore();

onMounted(() => {
    store.getAllTendencias();
});

const filmes = computed(() => store.tendencias.filter(item => item.title));
</script>

<template>
    <main>
        <h1>TENDÊNCIAS</h1>
        <ul>
            <li v-for="filme in filmes" :key="filme.id">
                <img :src="'https://image.tmdb.org/t/p/w500' + filme.poster_path" :alt="filme.title" />
                <p>{{ filme.title }}</p>
                <div class="informacao">
                    <p>{{ filme.release_date }}</p>
                    <p>Ver</p>
                </div>
            </li>
        </ul>
    </main>
</template>

<style scoped>
main{
  background: linear-gradient(to right, #44001a3d 0%, #C99BA6 100%);
}
h1{
  font-size: 2rem ;
  font-weight: 700;
    --bg-size: 400%;
    --color-one: #44001A;
    --color-two: #AA0041;
    background: linear-gradient(90deg,
            var(--color-one),
            var(--color-two),
            var(--color-one)) 0 0 / var(--bg-size) 100%;

    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;

    animation: move-bg 8s infinite linear;
}

@keyframes move-bg {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: var(--bg-size) 0;
    }
};
</style>