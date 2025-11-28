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
            params: { 
                language: 'pt-BR',
                append_to_response: 'external_ids'
            }
        });

        const filmesResponse = await TMDBapi.get(`/person/${id}/movie_credits`, {
            params: { language: 'pt-BR' }
        });

        const dados = response.data;

        atorDetalhes.value = {
            id: dados.id,
            nome: dados.name,
            biografia: dados.biography,
            imagem: dados.profile_path,
            nascimento: dados.birthday,
            genero:
                dados.gender === 1 ? "Feminino" :
                dados.gender === 2 ? "Masculino" :
                "Não informado",


            redes: {
                instagram: dados.external_ids.instagram_id
                    ? `https://instagram.com/${dados.external_ids.instagram_id}`
                    : null,
                facebook: dados.external_ids.facebook_id
                    ? `https://facebook.com/${dados.external_ids.facebook_id}`
                    : null,
                twitter: dados.external_ids.twitter_id
                    ? `https://twitter.com/${dados.external_ids.twitter_id}`
                    : null
            },

            filmes: filmesResponse.data.cast.slice(0, 20)
        };
    } catch (error) {
        console.error("Erro ao carregar detalhes do ator:", error);
    }
};

return{
    popularesAtores,
    atores,
    totalPages,
    getPopularAtores,
    listAtores,
    getAtorDetalhes,
    atorDetalhes,
}

});