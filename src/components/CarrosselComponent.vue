<script setup>
import { useTendenciasStore } from '@/stores/tendencias';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const openMovie = (id) => {
  router.push({ name: 'DetalhesFilmes', params: { movieId: id } })
}

const store = useTendenciasStore();

onMounted(() => {
  store.getAllTendencias();
});

const filmes = computed(() => store.tendencias.filter(item => item.title));
</script>

<template>
  <main>
    <h1>TENDÊNCIAS</h1>

    <div class="slider">
      <div class="track">
        <div class="card" v-for="filme in [...filmes, ...filmes]" :key="filme.id + Math.random()">
          <img
            :src="'https://image.tmdb.org/t/p/w500' + filme.poster_path"
            :alt="filme.title"
          />
          <p class="titulo">{{ filme.title }}</p>
          <div class="informacao">
            <p>{{ filme.release_date }}</p>
            <button @click="openMovie(filme.id)" class="ver">Ver</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background: linear-gradient(to right, #44001a3d 0%, #c99ba6 100%);
  padding: 2rem 0;
  overflow: hidden;
  text-align: center;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  --bg-size: 400%;
  --color-one: #44001a;
  --color-two: #aa0041;
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: move-bg 8s infinite linear;
  margin-bottom: 2rem;
}

@keyframes move-bg {
  0% { background-position: 0 0; }
  100% { background-position: var(--bg-size) 0; }
}

.slider {
  width: 100%;
  overflow: hidden;
}

.track {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}

.track:hover {
  animation-play-state: paused;
}

  .card {
  position: relative;
  list-style: none;
  flex: 0 0 auto;
  width: 200px;
  margin: 0 1vw;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
}

.card img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.09);
  transition: 1s;
   border-radius: 8px;
  & p {
    display: none;
  }
  & .ver{
    display: block; 
    color: white;
    background-color: #44001a;
    padding: 6px 88px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
      transform: translate(0%, -140%) scale(1.05);
  }
  & .ver:hover {
    background-color: #350114;
    transition: 1s;
  }
}

.titulo {
  margin: 0.5rem 0 1rem 0;
  font-weight: 700;
  white-space: normal;
  text-align: left;

}

.informacao {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  text-align: end;
  margin-top: 0.5rem;
  width: 100%;
}

.ver {
  background-color: #44001a;
  color: white;
  padding: 4px 30px;
  border-radius: 4px;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
