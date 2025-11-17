<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DetalhesFilmesBanner from '@/components/DetalhesFilmesBanner.vue'
import DetalhesFilmesElenco from '@/components/DetalhesFilmesElenco.vue'

const route = useRoute()
const store = useFilmesStore()

onMounted(async () => {
  await store.getMovieDetail(route.params.movieId)
})
</script>

<template>
  <main v-if="store.currentMovie">
    <button @click="$router.back()">Voltar</button>

    <DetalhesFilmesBanner />
    <DetalhesFilmesElenco />
  </main>
</template>
