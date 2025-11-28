<script setup>
import { ref, onMounted } from 'vue'
import { useActorsStore } from '@/stores/atores'

const store = useActorsStore()
const pageAtual = ref(1)

onMounted(async () => {
  await store.listAtores(1)
})

const mudarPagina = async (page) => {
  if (page < 1 || page > store.totalPages) return
  pageAtual.value = page
  await store.listAtores(page)
}
</script>

<template>
  <main>
    <div class="filtros-container">
      <h2 class="titulo">Atores Populares</h2>
    </div>

    <ul class="lista-filmes">
      <li v-for="ator in store.atores" :key="ator.id">
        <img
          :src="ator.imagem ? 'https://image.tmdb.org/t/p/w500' + ator.imagem : '/images/AtorSemFoto.avif'"
          :alt="ator.nome"
        />
        <h2>{{ ator.nome }}</h2>

        <p v-if="ator.filmes && ator.filmes.length">
          {{ ator.filmes.slice(0, 2).join(', ') }}
        </p>
        <p v-else>Sem filmes conhecidos</p>

       <button @click="$router.push(`/atores/${ator.id}`)">Ver mais</button>

      </li>
    </ul>

    <div v-if="store.atores.length" class="pagination">
      <button @click="mudarPagina(pageAtual - 1)" :disabled="pageAtual === 1">←</button>

      <button
        v-for="page in store.totalPages"
        :key="page"
        :class="{ active: pageAtual === page }"
        @click="mudarPagina(page)"
      >
        {{ page }}
      </button>

      <button @click="mudarPagina(pageAtual + 1)" :disabled="pageAtual === store.totalPages">→</button>
    </div>
  </main>
</template>

<style scoped>
.filtros-container {
  position: relative;
  margin-bottom: 30px;
  margin-left: 5%;
}

.titulo {
  font-weight: 600;
  font-size: 1.34rem;
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
</style>
