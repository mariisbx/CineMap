import { defineStore } from 'pinia'
import { ref } from 'vue'
import TMDBapi from '@/plugins/axios'

export const useFilmesStore = defineStore('filmes', () => {
  const filmes = ref([])


  const getTopRatedFilmes = async () => {
    try {
      const response = await TMDBapi.get('/movie/top_rated', {
        params: { language: 'pt-BR' },
      })
       const ordenados = response.data.results
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 3)

      filmes.value = ordenados
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error)
    }
  }

  return {
    filmes,
    getTopRatedFilmes,
  }
})
