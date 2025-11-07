import { defineStore } from 'pinia';
import { ref } from 'vue';
import TMDBapi from '@/plugins/axios';


export const useTendenciasStore = defineStore('tendencias', () => {

    const tendencias = ref([]);


    const getAllTendencias = async (time_window = 'week') => {
        try {
            const response = await TMDBapi.get(`trending/all/${time_window}`, {
             params: { language: 'pt-BR', api_key: ' eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQ5MDY1MzdiZDUxN2Q0YzRlNjI3YmVlNmYwZmJiMCIsIm5iZiI6MTc1OTQ0Mzc0Mi4zODIwMDAyLCJzdWIiOiI2OGRlZmIxZTBkYjJjNDdmMmUzYjhhMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WdZxeGJU4JZyVewsfZW2SFxSW--WQHb3tMg5jqXarxA' }
            }
            );
            tendencias.value = response.data.results;
        } catch (error) {
            console.error('Erro ao buscar tendências:', error);
        }
    };

    return {
        tendencias,
        getAllTendencias,
    };
});
