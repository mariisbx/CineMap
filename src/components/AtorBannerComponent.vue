<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useActorsStore } from '@/stores/atores'

const route = useRoute()
const store = useActorsStore()

onMounted(() => {
  store.getAtorDetalhes(route.params.atorId)
})
</script>

<template>
  <div class="detalhes-container">
    
    <div class="card-detalhes">
      <img
        v-if="store.atorDetalhes?.imagem"
        :src="`https://image.tmdb.org/t/p/w500${store.atorDetalhes.imagem}`"
        class="foto-ator"
      />

      <div v-else class="foto-placeholder">Sem imagem</div>

      <h1>{{ store.atorDetalhes?.nome }}</h1>

      <p class="bio" v-if="store.atorDetalhes?.biografia">
        {{ store.atorDetalhes.biografia }}
      </p>

      <p v-else class="bio">Nenhuma biografia disponível.</p>

      <div class="info-extra">
        <p><strong>Nascimento:</strong> {{ store.atorDetalhes?.nascimento }}</p>
      </div>
    </div>

    <div class="filmes-section">
      <h2>Filmes</h2>

      <div class="filmes-list">
        <div
          v-for="filme in store.atorDetalhes?.filmes"
          :key="filme.id"
          class="filme-card"
        >
          <img
            v-if="filme.poster_path"
            :src="`https://image.tmdb.org/t/p/w300${filme.poster_path}`"
          />
          <div class="filme-info">
            <p>{{ filme.title }}</p>
            <small>Personagem: {{ filme.character }}</small>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
