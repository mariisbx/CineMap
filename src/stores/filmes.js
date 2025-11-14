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
  const trailerKey = ref(null)
  const currentMovie = ref(null)

  const getTopRatedFilmes = async () => {
    try {
      const response = await TMDBapi.get('/movie/top_rated', {
        params: { language: 'pt-BR' },
      })

      filmesMaisBemAvaliados.value = response.data.results
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 3)

    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error)
    }
  }

  const getGenres = async () => {
    try {
      const response = await TMDBapi.get('/genre/movie/list', {
        params: { language: 'pt-BR' }
      })
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

  const getMovieDetail = async (id) => {
    try {
      // detalhes do filme
      const movieRes = await TMDBapi.get(`/movie/${id}`, {
        params: { language: 'pt-BR' }
      })

      currentMovie.value = movieRes.data

      // vídeos
      const videoRes = await TMDBapi.get(`/movie/${id}/videos`, {
        params: { language: 'pt-BR' }
      })

      const trailer = videoRes.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      )

      trailerKey.value = trailer ? trailer.key : null

    } catch (err) {
      console.error("Erro ao carregar detalhes do filme:", err)
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
    currentMovie,
    trailerKey,
    getMovieDetail,
  }
})
