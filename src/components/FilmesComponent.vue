<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFilmesStore } from '@/stores/filmes'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useFilmesStore()
const { buscaFilme } = storeToRefs(store)

const mostrarFiltros = ref(false)
const buscaGenero = ref('')

let searchTimer = null

const openMovie = (id) => {
  router.push({
    name: 'DetalhesFilmes',
    params: { movieId: id },
    query: { page: store.pageAtual }
  })
}

onMounted(async () => {
  if (!store.genres.length) {
    await store.getGenres()
  }

  const initialPage = Number(router.currentRoute.value.query.page) || store.pageAtual
  store.pageAtual = initialPage

  await store.listMovies(store.pageAtual, store.filtrosAtivos, buscaFilme.value)
})

onBeforeUnmount(() => {
  clearTimeout(searchTimer)
})

const mudarPagina = async (page) => {
  if (page < 1 || page > store.totalPages) return
  store.pageAtual = page
  await store.listMovies(page, store.filtrosAtivos, buscaFilme.value)
}

const aplicarFiltros = async () => {
  const idsSelecionados = store.genres
    .filter(g => g.selecionado)
    .map(g => g.id)

  store.filtrosAtivos = idsSelecionados
  store.pageAtual = 1
  await store.listMovies(store.pageAtual, store.filtrosAtivos, buscaFilme.value)
  mostrarFiltros.value = false
}

const limparFiltros = async () => {
  store.genres.forEach(g => (g.selecionado = false))
  store.filtrosAtivos = []
  buscaGenero.value = ''
  buscaFilme.value = ''
  store.pageAtual = 1
  await store.listMovies(store.pageAtual, [])
}

const pesquisarFilme = async () => {
  store.pageAtual = 1
  await store.listMovies(1, store.filtrosAtivos, buscaFilme.value)
}

const onSearchInput = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(async () => {
    store.pageAtual = 1
    await store.listMovies(1, store.filtrosAtivos, buscaFilme.value)
  }, 400)
}

const generosFiltrados = computed(() =>
  store.genres.filter(g => g.name.toLowerCase().includes(buscaGenero.value.toLowerCase()))
)
</script>

<template>
  <main>
    <div class="delado">
      <div class="filtros-container">
        <button class="botao-filtro" @click="mostrarFiltros = !mostrarFiltros">
          Filtrar Gêneros ▾
        </button>

        <div v-if="mostrarFiltros" class="caixa-filtros">
          <div class="topo-filtro">
            <h3>Filtros</h3>
            <button class="botao-limpar" @click="limparFiltros">✕ Limpar</button>
          </div>

          <input v-model="buscaGenero" class="campo-busca" placeholder="Pesquisar gênero..." />

          <ul class="lista-filtros">
            <li v-for="g in generosFiltrados" :key="g.id">
              <label><input type="checkbox" v-model="g.selecionado" /> {{ g.name }}</label>
            </li>
          </ul>

          <button class="botao-aplicar" @click="aplicarFiltros">Aplicar</button>
        </div>
      </div>

      <div class="pesquisa">
        <input
          type="text"
          placeholder="Pesquisar filmes..."
          v-model="buscaFilme"
          @input="onSearchInput"
          @keyup.enter.prevent="pesquisarFilme"
        />
        <span class="mdi mdi-magnify"></span>
      </div>
    </div>

    <ul class="lista-filmes">
      <li v-for="filme in store.movies" :key="filme.id">
        <div v-if="!filme.poster_path" class="no-poster">
          <span class="mdi mdi-movie"></span>
          <p>Sem imagem disponível</p>
        </div>

        <img v-else :src="'https://image.tmdb.org/t/p/w500' + filme.poster_path" :alt="filme.title" />
        <h2>{{ filme.title }}</h2>
        <p>{{ filme.release_date }}</p>
        <button @click="openMovie(filme.id)">Ver mais</button>
      </li>
    </ul>

    <div v-if="store.movies.length" class="pagination">
      <button @click="mudarPagina(store.pageAtual - 1)" :disabled="store.pageAtual === 1">←</button>

      <button v-for="page in store.totalPages" :key="page" :class="{ active: store.pageAtual === page }"
        @click="mudarPagina(page)">
        {{ page }}
      </button>

      <button @click="mudarPagina(store.pageAtual + 1)" :disabled="store.pageAtual === store.totalPages">→</button>
    </div>
  </main>
</template>

<style scoped>
.filtros-container {
  position: relative;
  margin-bottom: 30px;
  margin-left: 5%;
}

.botao-filtro {
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.34rem;
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
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}

.caixa-filtros {
  position: absolute;
  top: 35px;
  left: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px 20px;
  width: 230px;
  z-index: 10;
}


.topo-filtro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.topo-filtro h3 {
  font-size: 1rem;
  color: #44001a;
}

.botao-limpar {
  background: none;
  border: none;
  color: #999;
  font-size: 0.85rem;
  cursor: pointer;
}

.campo-busca {
  width: 100%;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.lista-filtros {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
  max-height: 150px;
  overflow-y: auto;
}

.lista-filtros li {
  margin-bottom: 5px;
  font-size: 0.95rem;
}


.botao-aplicar {
  background: #44001a;
  color: white;
  border: none;
  width: 100%;
  padding: 6px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.botao-aplicar:hover {
  background: #310013;
  transition: 0.3s;
}

.lista-filmes {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  list-style: none;
  padding: 0;
  justify-content: center;
}

.lista-filmes li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

img {
  width: 100%;
  border-radius: 10px;
}

h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 0 5px 0;
}

p {
  color: #D3B1B8;
  margin-bottom: 10px;
}

.lista-filmes button {
  padding: 6px 0;
  border: none;
  border-radius: 6px;
  background-color: #44001A;
  color: white;
  cursor: pointer;
}

.lista-filmes button:hover {
  background-color: #2e0012;
  transition: 1s;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.pagination button {
  background: none;
  border: none;
  color: #44001a;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.pagination button.active {
  background: #44001a;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.pagination button:hover:not(.active):not(:disabled) {
  color: #7a0033;
  transform: scale(1.1);
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: default;
}

.no-poster {
  background-color: #2e00125e;
  width: 100%;
  height: 83%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.no-poster p {
  color: white;
  margin-bottom: 5px;

}

.no-poster .mdi {
  color: white;
  font-size: 2rem;
}

.delado {
  display: flex;
  align-items: center;
  gap: 5vw;
}

.pesquisa {
  background: #d3b1b89a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  padding: 5px 15px;
  width: 300px;
  transition: 0.3s ease;
  margin-bottom: 1.6vw;

}


.pesquisa:focus-within {
  box-shadow: 0 0 0 2px #44001a30;
}

.pesquisa input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.1rem;
  width: 100%;
  color: #44001a;
}

.pesquisa input::placeholder {
  color: white;
  opacity: 0.9;
}

.pesquisa .mdi {
  color: white;
  font-size: 1.4rem;
  margin-left: 8px;
}
</style>
