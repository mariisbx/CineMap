import { defineStore } from 'pinia'
import { ref } from 'vue'
import TMDBapi from '@/plugins/axios'

export const useActorsStore = defineStore('atores', () => {
    const popularesAtores = ref([]);
    const atores = ref([]);
    const totalPages = ref(1);

    const getPopularAtores = async () => {
        try {
            const response = await TMDBapi.get('/person/popular', {
                params: { language: 'pt-br' },
            });
            const ordenados = response.data.results
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 4);

            popularesAtores.value = ordenados;
        } catch (error) {
            console.error('Erro ao buscar atores populares:', error);
        }
    };


    const listAtores = async (page = 1) => {
        try {
            const response = await TMDBapi.get('/person/popular', {
                params: {
                    language: 'pt-BR',
                    page,
                },
            })

            atores.value = (response.data.results || []).map((ator) => ({
                id: ator.id,
                nome: ator.name,
                imagem: ator.profile_path,
                filmes: ator.known_for
                    .filter(f => f.title || f.name)
                    .slice(0, 2) 
                    .map(f => f.title || f.name),
            }))

            const total = response.data.total_results || 0
            const pages = Math.ceil(total / 20)
            totalPages.value = pages > 15 ? 15 : pages
        } catch (error) {
            console.error('Erro ao listar atores:', error)
        }
    }

    const atorDetalhes = ref(null);

const getAtorDetalhes = async (id) => {
    try {
        const response = await TMDBapi.get(`/person/${id}`, {
            params: { language: 'pt-BR' }
        });

        const filmesResponse = await TMDBapi.get(`/person/${id}/movie_credits`, {
            params: { language: 'pt-BR' }
        });

        atorDetalhes.value = {
            id: response.data.id,
            nome: response.data.name,
            biografia: response.data.biography,
            imagem: response.data.profile_path,
            nascimento: response.data.birthday,
            filmes: filmesResponse.data.cast.slice(0, 20)
        };
    } catch (error) {
        console.error("Erro ao carregar detalhes do ator:", error);
    }
};

    return {
        popularesAtores,
        getPopularAtores,
        atores, 
        totalPages,
        listAtores,
        atorDetalhes,
        getAtorDetalhes,
    };


});