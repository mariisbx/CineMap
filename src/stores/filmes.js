import { defineStore } from 'pinia'
import { ref } from 'vue'
import TMDBapi from '@/plugins/axios'

export const useFilmesStore = defineStore('filmes', () => {
  const filmes = ref([])
  const filmesMaisBemAvaliados = ref([])
  const movies = ref([])
  const genres = ref([])
  const totalPages = ref(1)
  const filtrosAtivos = ref([])


  const getTopRatedFilmes = async () => {
    try {
      const response = await TMDBapi.get('/movie/top_rated', {
        params: { language: 'pt-BR' },
      })
       const ordenados = response.data.results
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 3)

      filmesMaisBemAvaliados.value = ordenados
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error)
    }
  }

  const getGenres = async () => {
    try {
      const response = await TMDBapi.get('/genre/movie/list', { params: { language: 'pt-BR' } })
      genres.value = response.data.genres.map(g => ({ ...g, selecionado: false }))
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error)
    }
  }

  const listMovies = async (page = 1, genreIds = []) => {
    try {
      const response = await TMDBapi.get('/discover/movie', {
        params: {
          language: 'pt-BR',
          page,
          with_genres: genreIds.length ? genreIds.join(',') : undefined,
        },
      })

      movies.value = response.data.results || []

      const total = response.data.total_results || 0
      const pages = Math.ceil(total / 20)
      totalPages.value = pages > 15 ? 15 : pages
    } catch (error) {
      console.error('Erro ao listar filmes:', error)
    }
  }

  return {
    filmes,
    movies,
    genres,
    totalPages,
    filtrosAtivos,
    getGenres,
    listMovies,
    getTopRatedFilmes,
    filmesMaisBemAvaliados,
  }
})
