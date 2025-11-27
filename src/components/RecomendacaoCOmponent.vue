<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { watch } from 'vue'

const store = useFilmesStore()

// Observa currentMovie e busca recomendações sempre que mudar
watch(
  () => store.currentMovie,
  (newMovie) => {
    if (newMovie?.id) {
      store.getMovieRecommendations(newMovie.id)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="recommendations">
    <h2>Recomendações</h2>
    <div v-if="store.recommendations.length > 0">
      <div v-for="movie in store.recommendations" :key="movie.id">
        <img 
  v-if="movie.backdrop_path" 
  :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" 
  :alt="movie.title" 
/>

        <p>{{ movie.title }}</p>
      </div>
    </div>
    <div v-else>

      <span class="mdi mdi-emoticon-neutral-outline"></span>
      <p>Não há recomendações para este filme.</p>
    </div>
  </div>
</template>
