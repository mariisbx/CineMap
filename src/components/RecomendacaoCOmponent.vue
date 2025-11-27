<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useFilmesStore()

const openMovie = (id) => {
  router.push({ name: 'DetalhesFilmes', params: { movieId: id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>

<template>
  <div class="recommendations">
    <h2>Recomendações</h2>
    <div v-if="store.recommendations.length > 0" class="receomendacao">
      <div v-for="movie in store.recommendations" :key="movie.id">
        <img v-if="movie.backdrop_path" :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
          :alt="movie.title" />

        <div class="informacao">
          <p>{{ movie.title }}</p>
          <button @click="openMovie(movie.id)">Ver mais</button>
        </div>

      </div>
    </div>
    <div v-else class="sem-formatacao">
      <span class="mdi mdi-emoticon-neutral-outline"></span>
      <p>Não há recomendações para este filme.</p>
    </div>
  </div>
</template>


<style scoped>
.receomendacao {
  display: flex;
  overflow-x: auto;
  margin: 0 6.5vw;
  gap: 2rem;
  margin-top: 1vw;
  margin-bottom: 2vw;

}
.informacao{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2 {
  font-size: 1.5rem;
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
  margin-left: 6.5vw;
  margin-top: 2vw;
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}

img {
  width: 350px;
  border-radius: 7px;
  box-shadow: #44001a 1px 1px 9px;
}

.receomendacao::-webkit-scrollbar {
  height: 10px;
}

.receomendacao::-webkit-scrollbar-track {
  background: white;
  border-radius: 10px;
}

.receomendacao::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #c99ba6a6, #ddb8c367);
  border-radius: 10px;
  width: 600px;
}

.receomendacao::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #c99ba6a6, #ddb8c367);
}

p {
  font-size: 1.2rem;
  margin: 0.3vw 0 1vw 0;
  font-weight: 700;
  width: 60%;
}

.receomendacao button {
  width: 30%;
  height: 20hh;
  justify-content: left;
  padding: 0.4rem 0;
  margin-top: 0.5rem;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  background: #44001a;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1vw;
}

.receomendacao button:hover {
  background: #20000c;
  transition: 2s;
}
.sem-formatacao{
    margin-left: 6.5vw;
    display: flex;
    align-items: center;
    margin-bottom: 2vw;
}
.sem-formatacao .mdi{
  font-size: 1.7rem;
  margin-top: 1.5px;
  margin-right: 10px;
}
.sem-formatacao p{
  margin-top: 1vw;
}
</style>
