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
      <img v-if="store.atorDetalhes?.imagem" :src="`https://image.tmdb.org/t/p/w500${store.atorDetalhes.imagem}`"
        class="foto-ator" />

      <div v-else class="foto-placeholder">
        <img src="/images/AtorSemFoto.avif" :alt="store.atorDetalhes?.nome || 'Ator sem foto'" />
      </div>

      <div class="dados-ator">
        <h1>{{ store.atorDetalhes?.nome }}</h1>

        <p class="bio" v-if="store.atorDetalhes?.biografia">
          {{ store.atorDetalhes.biografia }}
        </p>

        <p v-else class="bio">Nenhuma biografia disponível para {{ store.atorDetalhes?.nome }}</p>

        <div class="informacao">
          <h2>Informações pessoais:</h2>
          <p>Gênero: {{ store.atorDetalhes?.genero }}</p>
          <p v-if="store.atorDetalhes?.nascimento">Nascimento:{{ store.atorDetalhes?.nascimento }}</p>
        </div>

        <ul v-if="store.atorDetalhes?.redes" class="social-list">
          <li v-if="store.atorDetalhes.redes.instagram">
            <a :href="store.atorDetalhes.redes.instagram" target="_blank"><span class="mdi mdi-instagram"></span></a>
          </li>
          <li v-if="store.atorDetalhes.redes.facebook">
            <a :href="store.atorDetalhes.redes.facebook" target="_blank">
              <span class="mdi mdi-facebook"></span></a>
          </li>
          <li v-if="store.atorDetalhes.redes.twitter">
            <a :href="store.atorDetalhes.redes.twitter" target="_blank">
                <span class="mdi mdi-twitter"></span></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="filmes-section">
      <h2>Filmes</h2>

      <div class="filmes-list">
        <div v-for="filme in store.atorDetalhes?.filmes" :key="filme.id" class="filme-card">
          <img v-if="filme.poster_path" :src="`https://image.tmdb.org/t/p/w300${filme.poster_path}`"
            :alt="filme.title || filme.name" />
          <div v-else class="no-poster">
          <span class="mdi mdi-movie"></span>
          <p>Sem imagem disponível</p>
        </div>

          <div class="filme-info">
            <p>{{ filme.title || filme.name }}</p>
            <small>Personagem: {{ filme.character }}</small>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.card-detalhes {
  display: flex;
  align-items: flex-start;
  border-radius: 12px;
  margin: 0 6.5vw;

}

.foto-ator {
  width: 400px;
  height: 60vh;
}

.foto-placeholder {
  width: 400px;
  height: 55vh;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  --bg-size: 400%;
  --color-one: #44001a;
  --color-two: #aa0041;
  background: linear-gradient(90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)) 0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: move-bg 8s infinite linear;
  margin-bottom: 1vw;
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}

.dados-ator {
  margin-left: 4vw;
}

.bio {
  font-size: 1.1rem;
  line-height: 120%;
}
.informacao h2{
  font-size: 2rem;
  font-weight: 700;
  --bg-size: 400%;
  --color-one: #44001a;
  --color-two: #aa0041;
  background: linear-gradient(90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)) 0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: move-bg 8s infinite linear;
  margin-top: 2vw;
  margin-bottom: 1vw;
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}
.informacao p{
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.social-list{
  display: flex;
}
 .social-list a .mdi{
  font-size: 2rem;
  color: #44001a;
  margin-right: 10px;
  margin-top: 20px;
}
.filmes-section {
  margin-top: 2vw;
  padding: 0 6.5vw;
}

.filmes-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  --bg-size: 400%;
  --color-one: #44001a;
  --color-two: #aa0041;
  background: linear-gradient(90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)) 0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: move-bg 8s infinite linear;
  margin-bottom: 1.5rem;
}

.filmes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  gap: 22px;
  margin-top: 2rem;
}

.filme-card {
  background: #ffffff;
  border-radius: 12px;
  transition: transform .2s ease, box-shadow .2s ease;
  margin-bottom: 1vw;
}

.filme-card:hover {
  transform: translateY(-6px);
}

.filme-card img {
  width: 300px;
  border-radius: 10px;
  height: 400px;
  object-fit: cover;
}

.filme-info {
  margin-top: 10px;
}

.filme-info p {
  font-size: 1.1rem;
  font-weight: 600;
  width: 90%;
  color: #44001a;
    margin-bottom: 5px;
}

.filme-info small {
  font-size: 1rem;
  opacity: .7;

}
.no-poster{
  background-color: #2e00125e;
  width: 100%;
  height: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.no-poster p{
  color: white;
  margin-bottom: 5px;

}
.no-poster .mdi{
  color: white;
  font-size: 2rem;
}
</style>