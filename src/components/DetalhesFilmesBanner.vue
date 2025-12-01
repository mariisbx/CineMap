<script setup>
import { useFilmesStore } from '@/stores/filmes'
const store = useFilmesStore()
</script>

<template>
  <section class="banner" :style="{
    backgroundImage: store.currentMovie?.backdrop_path
      ? `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0)), url('https://image.tmdb.org/t/p/original${store.currentMovie.backdrop_path}')`
      : ''
  }">

    <section class="principal">
      <h1>{{ store.currentMovie.title }} ({{ store.currentMovie.release_date.slice(0, 4) }})</h1>

      <ul>
        <li class="idade">{{ store.classificaoIndicativa || 'Não informado' }}</li>

        <li v-for="g in store.currentMovie.genres" :key="g.id">
          {{ g.name }}
        </li>
      </ul>

      <p class="tagline">{{ store.currentMovie.tagline }}</p>
      <p class="sinopse">{{ store.currentMovie.overview }}</p>

      <section v-if="store.trailerKey">
        <iframe width="100%" height="450" :src="`https://www.youtube.com/embed/${store.trailerKey}`"
          allowfullscreen></iframe>
      </section>

      <section v-else class="sem-trailer">
        <span class="mdi mdi-video-off"></span>
        <p>Trailer não disponível</p>
      </section>
    </section>
  </section>
</template>


<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.principal {
  width: 45%;
  padding: 3vw 7vw;
}

h1 {
  font-size: 2rem;
  color: #C99BA6;
}

iframe {
  width: 350px;
  height: 30vh;
  margin-top: 1vw;
}

ul {
  display: flex;
  margin: 1vw 0;
  align-items: center;
  flex-wrap: wrap; 
  gap: 8px;
}

ul li {
  color: #c99ba69f;
  margin-right: 2vw;
  margin-top: 4px;
}

ul li.idade {
  color: #D3B1B8;
  border: 1px #D3B1B8 solid;
  padding: 6px;
  border-radius: 3px;
}

.tagline {
  color: #c99ba69f;
  font-size: 1.2rem;
  margin-top: 2vw;
}

.sinopse {
  color: rgba(255, 255, 255, 0.842);
  font-size: 1.1rem;
  margin-top: 1vw;
  line-height: 150%;
}

.sem-trailer{
  color: #ddb1bb;
  background-color: #c99ba64d;
  text-align: center;
  width: 350px;
  height: 23vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  margin-top: 2vw;
}
.sem-trailer .mdi{
  font-size: 1.6rem;
  margin-bottom: 3px;
}
.sem-trailer p{
  font-size: 1.09rem;
}
</style>
