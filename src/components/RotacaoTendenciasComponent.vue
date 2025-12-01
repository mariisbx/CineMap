<script setup>
import { useTendenciasStore } from '@/stores/tendencias';
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const openMovie = (id) => {
  router.push({ name: 'DetalhesFilmes', params: { movieId: id } })
}


const store = useTendenciasStore();

onMounted(() => {
    store.getAllTendencias();
});

onBeforeUnmount(() => {
    store.pararRotacao();
});
</script>


<template>

    <section class="banner" :style="{
        backgroundImage: store.filmeAtual?.backdrop_path
            ? `linear-gradient(to right, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%), url('https://image.tmdb.org/t/p/original${store.filmeAtual.backdrop_path}')`: 'linear-gradient(to right, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%)'
    }">

        <div v-if="store.filmeAtual" class="rotacao-tendencias">
            <div class="filme-destaque">
                <div class="info-filme">
                    <h3>{{ store.filmeAtual.title }}</h3>
                    <p class="data">{{ store.filmeAtual.release_date}}</p>
                    <p class="descricao">{{ store.filmeAtual.overview }}</p>

                    <div class="botoes" v-for="generos in store.filmeAtual.genres" :key="generos.id">
                        <p>{{ generos.name }}</p>
                    </div>

                </div>
                 <button @click="openMovie(store.filmeAtual.id)" class="ver">Ver</button>
            </div>
        </div>
    </section>

</template>

<style scoped> 
.banner {
  position: relative;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: start;
  transition: background-image 1s ease-in-out;
}
.rotacao-tendencias {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5%;
}
.filme-destaque {
  color: white;
  padding: 20px;
  max-width: 600px;
  margin: auto 0;
}
h3{
    color: #C99BA6;
    font-size: 2.5rem;
    font-weight: 600;
}
.data {
    margin-top: 15px;
    font-size: 1.4rem;
    color: #c99ba6a2;
} 
.descricao{
    margin-top: 20px;
    font-size: 1.2rem;
    line-height: 1.4;
}
.botoes {
    display: inline-block;
    margin: 24px 10px 0 0;
    padding: 6px 30px;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #44001A;
}
button{
    width: 100%;
    margin-top: 24px;
    padding: 5px;
    font-size: 1.07rem;
    border: none;
    border-radius: 6px;
    background-color: #c99ba693;
    color: white;
}
button:hover{
    background-color: #c99ba6c2;
    transition: 1s;
    cursor: pointer;
}
</style>