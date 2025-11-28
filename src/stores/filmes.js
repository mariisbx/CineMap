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
  const classificaoIndicativa = ref('')
  const elenco = ref([])
  const pageAtual = ref(1)
  const redesSociais = ref({})
  const posters = ref([])
  const recommendations = ref([]) 

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
      const movieRes = await TMDBapi.get(`/movie/${id}`, {
        params: { language: 'pt-BR' }
      })

      currentMovie.value = movieRes.data

      const videoRes = await TMDBapi.get(`/movie/${id}/videos`, {
        params: { language: 'pt-BR' }
      })

      const trailer = videoRes.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      )

      trailerKey.value = trailer ? trailer.key : null

      const releasesRes = await TMDBapi.get(`/movie/${id}/release_dates`)
      const brRelease = releasesRes.data.results.find(r => r.iso_3166_1 === 'BR')

      if (brRelease && brRelease.release_dates.length > 0) {
        classificaoIndicativa.value = brRelease.release_dates[0].certification || "Não informado"
      } else {
        classificaoIndicativa.value = "Não informado"
      }

      const creditos = await TMDBapi.get(`/movie/${id}/credits`, {
        params: { language: 'pt-BR' }
      }
      )

      elenco.value = creditos.data.cast.slice(0, 15)

      const externalRes = await TMDBapi.get(`/movie/${id}/external_ids`)
      redesSociais.value = {
        instagram: externalRes.data.instagram_id,
        twitter: externalRes.data.twitter_id,
        facebook: externalRes.data.facebook_id
      }

      const imagesRes = await TMDBapi.get(`/movie/${id}/images`, {
        params: { include_image_language: 'en,null,pt' }
      })

      posters.value = imagesRes.data.posters || []

      getMovieRecommendations(id)
      
    } catch (err) {
      console.error("Erro ao carregar detalhes do filme:", err)
    }
  }

  const resetMovie = () => {
    trailerKey.value = null
  }

  const getMovieRecommendations = async (id) => {
  try {
    const response = await TMDBapi.get(`/movie/${id}/recommendations`, {
      params: { language: 'pt-BR', page: 1 }
    });

    recommendations.value = response.data.results || [];

  } catch (err) {
    console.error("Erro ao buscar recomendações:", err);
  }
};

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
    classificaoIndicativa,
    elenco,
    resetMovie,
    pageAtual,
    redesSociais,
    posters,
    recommendations,
    getMovieRecommendations,
  }
})
