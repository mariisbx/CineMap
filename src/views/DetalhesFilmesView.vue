<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import DetalhesFilmesBanner from '@/components/DetalhesFilmesBanner.vue'
import DetalhesFilmesElenco from '@/components/DetalhesFilmesElenco.vue'
import PostersComponent from '@/components/PostersComponent.vue'
import RecomendacaoCOmponent from '@/components/RecomendacaoCOmponent.vue'

const route = useRoute()
const store = useFilmesStore()


onMounted(() => {
  store.getMovieDetail(route.params.movieId)
})


watch(
  () => route.params.movieId,
  (newId) => {
    store.getMovieDetail(newId)
  }
)


function voltar() {
  store.resetMovie()
  window.history.back()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main v-if="store.currentMovie">
    <button @click="voltar()">
       <span class="mdi mdi-arrow-left"></span>
      Voltar</button>

    <DetalhesFilmesBanner />
    <DetalhesFilmesElenco />
    <PostersComponent />
    <RecomendacaoCOmponent/>
  </main>
</template>

<style scoped>
button{
  background-color: white;
  border: none;
  font-size: 1.1rem;
  color: #44001a;
  margin-left: 6.5rem;
  align-items: center;
  margin-top: 1vw ;
  margin-bottom: 1vw;
  cursor: pointer;
}
button:hover{
  color: #aa0041;
  transition: 1s;
}
.mdi{
  font-size: 1.3rem;
}
</style>
