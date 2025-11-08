import { defineStore } from 'pinia'
import { ref } from 'vue'
import TMDBapi from '@/plugins/axios'

export const useActorsStore = defineStore('atores', () => {
    const popularesAtores = ref([]);

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

    return {
        popularesAtores,
        getPopularAtores,
    };


});