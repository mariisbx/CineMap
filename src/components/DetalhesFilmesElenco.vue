<script setup>
import { useFilmesStore } from '@/stores/filmes'
import { useRouter, useRoute } from 'vue-router'

const store = useFilmesStore()
const router = useRouter()
const route = useRoute()

//const irParaAtor = (id) => {
 // router.push({
 //   path: `/atores/${id}`,
  // query: {
  //    from: 'filme',
  //    movieId: route.params.movieId 
  //  }
  //})

 // window.scrollTo({
//  top: 0,
  //  behavior: 'smooth'
  //})
//}
</script>

<template>
  <section>
    <h1>Elenco principal</h1>

    <ul>
      <li v-for="ator in store.elenco" :key="ator.id">
        <img
          :src="ator.profile_path ? 'https://image.tmdb.org/t/p/w500' + ator.profile_path : '/images/AtorSemFoto.avif'">
        <p class="ator">{{ ator.name }}</p>
        <p class="personagem">{{ ator.character }}</p>
      </li>
    </ul>
  </section>

  <section class="info">
    <h2 class="titulo">Titulo original</h2>
    <p class="otomano">{{ store.currentMovie.original_title }}</p>

    <h2 v-if="store.redesSociais.twitter || store.redesSociais.instagram" class="titulo">Redes socias</h2>
    <div class="icones">

    <a v-if="store.redesSociais.twitter" :href="'https://twitter.com/' + store.redesSociais.twitter" target="_blank">
      <span class="mdi mdi-twitter"></span>
    </a>

    <a v-if="store.redesSociais.instagram" :href="'https://instagram.com/' + store.redesSociais.instagram"
      target="_blank">
      <span class="mdi mdi-instagram"></span>
    </a>

    <a v-if="store.redesSociais.facebook" :href="'https://facebook.com/' + store.redesSociais.facebook"
      target="_blank">

      <span class="mdi mdi-facebook"></span>
  </a>
      </div>
  </section>
</template>

<style scoped>
h1 {
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
  margin-bottom: 2rem;
  margin-left: 6.5vw;
  margin-top: 1vw;
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}

ul {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 30px;
  margin: 1vw 6.5vw;
  padding-bottom: 10px;
}

ul::-webkit-scrollbar {
  height: 10px;
}

ul::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #c99ba6, #4a2f36);
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #ddb8c3, #4a2f36);
}

ul li img {
  width: 250px;
  border-radius: 10px;
}

li {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 1vw;
}

.ator {
  font-size: 1.2rem;
  padding-top: 10px;
  margin-bottom: 5px;
  margin-left: 8px;
}

.personagem {
  color: #c99ba698;
  font-size: 1.1rem;
  padding-bottom: 20px;
  margin-left: 8px;
}

li:hover {
  transform: scale(1.05);
  transition: 1s;
  border-radius: 10px;
}

.titulo{
  font-size: 1.3rem;
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
  margin-bottom: 0.6vw;
  margin-left: 6.5vw;
  margin-top: 2vw;
}

.otomano{
  margin-left: 6.5vw;
  font-size: 1.2rem;
  font-weight: 600;
}

.icones{
  font-size: 2rem;
  margin-left: 6.5vw;
  display: flex;
}
.mdi{
  margin-right: 10px;
  color: #1a1a1a;
  }
</style>
