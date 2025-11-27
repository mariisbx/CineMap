<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DetalhesFilmesBanner from '@/components/DetalhesFilmesBanner.vue'
import DetalhesFilmesElenco from '@/components/DetalhesFilmesElenco.vue'
import PostersComponent from '@/components/PostersComponent.vue'
import RecomendacaoCOmponent from '@/components/RecomendacaoCOmponent.vue'

const route = useRoute()
const store = useFilmesStore()

onMounted(async () => {
  await store.getMovieDetail(route.params.movieId)
})

function voltar() {
  store.resetMovie()
  window.history.back()
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
