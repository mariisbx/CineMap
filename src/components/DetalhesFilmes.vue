<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useFilmesStore()

onMounted(async () => {
  await store.getMovieDetail(route.params.movieId)
})
</script>

<template>
  <main v-if="store.currentMovie">
    <section class="banner" :style="{
      backgroundImage: store.currentMovie?.backdrop_path
        ? `linear-gradient(to right, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%), url('https://image.tmdb.org/t/p/original${store.currentMovie.backdrop_path}')` : 'linear-gradient(to right, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0) 100%)'
    }">

      <h1>{{ store.currentMovie.title }}</h1>


      <p>{{ store.currentMovie.overview }}</p>
      <section v-if="store.trailerKey">
        <iframe width="100%" height="450" :src="`https://www.youtube.com/embed/${store.trailerKey}`" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </section>
      <button @click="$router.back()">Voltar</button>
    </section>
  </main>
</template>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
