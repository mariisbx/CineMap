<script setup>
import { ref, onMounted, watch } from 'vue'
import { useActorsStore } from '@/stores/atores'
import { useRoute } from 'vue-router'

const store = useActorsStore()
const route = useRoute()

const pageAtual = ref(Number(route.query.page) || 1)
const busca = ref('')

// Carrega atores ao abrir a página
onMounted(async () => {
  await store.listAtores(pageAtual.value)
})

/* QUANDO DIGITAR, FAZ BUSCA GLOBAL */
watch(busca, async (novoValor) => {
  if (novoValor && novoValor.trim() !== '') {
    await store.buscarAtores(novoValor)
  } else {
    store.limparBusca()
  }
})

// Paginação
const mudarPagina = async (page) => {
  if (page < 1 || page > store.totalPages) return

  pageAtual.value = page
  await store.listAtores(page)

  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main>

    <div class="filtros-container">
      <h2 class="titulo">Atores Populares</h2>

      <div class="pesquisa">
        <input
          type="text"
          placeholder="Pesquisar atores..."
          v-model="busca"
        />
        <span class="mdi mdi-magnify"></span>
      </div>
    </div>

    <!-- LISTA DE BUSCA GLOBAL -->
    <ul v-if="busca && store.resultadosBusca.length" class="lista-filmes">
      <li v-for="ator in store.resultadosBusca" :key="ator.id">

        <img
          :src="ator.profile_path
            ? 'https://image.tmdb.org/t/p/w500' + ator.profile_path
            : '/images/AtorSemFoto.avif'"
          :alt="ator.name"
        />

        <h2>{{ ator.name }}</h2>

        <p v-if="ator.known_for && ator.known_for.length">
          {{ ator.known_for.map(f => f.title || f.name).slice(0,2).join(', ') }}
        </p>
        <p v-else>Sem filmes conhecidos</p>

        <button
          @click="$router.push({
            path: `/atores/${ator.id}`,
            query: { from: 'atores', page: pageAtual }
          })"
        >
          Ver mais
        </button>
      </li>
    </ul>

    <!-- LISTA NORMAL COM PAGINAÇÃO -->
    <ul v-else class="lista-filmes">
      <li v-for="ator in store.atores" :key="ator.id">

        <img
          :src="ator.imagem
            ? 'https://image.tmdb.org/t/p/w500' + ator.imagem
            : '/images/AtorSemFoto.avif'"
          :alt="ator.nome"
        />

        <h2>{{ ator.nome }}</h2>

        <p v-if="ator.filmes && ator.filmes.length">
          {{ ator.filmes.slice(0, 2).join(', ') }}
        </p>
        <p v-else>Sem filmes conhecidos</p>

        <button
          @click="$router.push({
            path: `/atores/${ator.id}`,
            query: { from: 'atores', page: pageAtual }
          })"
        >
          Ver mais
        </button>
      </li>
    </ul>

    <!-- PAGINAÇÃO (SÓ SE NÃO ESTIVER BUSCANDO) -->
    <div v-if="!busca && store.atores.length" class="pagination">

      <button 
        @click="mudarPagina(pageAtual - 1)" 
        :disabled="pageAtual === 1">
        ←
      </button>

      <button
        v-for="page in store.totalPages"
        :key="page"
        :class="{ active: pageAtual === page }"
        @click="mudarPagina(page)"
      >
        {{ page }}
      </button>

      <button 
        @click="mudarPagina(pageAtual + 1)" 
        :disabled="pageAtual === store.totalPages">
        →
      </button>

    </div>

  </main>
</template>


<style scoped>
.filtros-container {
  position: relative;
  margin-bottom: 30px;
  margin-left: 5%;
   display: flex;
  align-items: center;
  gap: 5vw;
}

.titulo {
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
  margin-bottom: 2rem;
}

@keyframes move-bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
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
  text-align: left;
}

img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
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

.pesquisa {
  background: #d3b1b89a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  padding: 5px 15px;
  width: 300px;
  transition: 0.3s ease;
  margin-bottom: 1vw;

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
