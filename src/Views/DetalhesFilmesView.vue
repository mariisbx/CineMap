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
    <button @click="voltar()">Voltar</button>

    <DetalhesFilmesBanner />
    <DetalhesFilmesElenco />
    <PostersComponent />
    <RecomendacaoCOmponent/>
  </main>
</template>
