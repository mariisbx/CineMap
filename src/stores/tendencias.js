import { defineStore } from 'pinia';
import { ref } from 'vue';
import TMDBapi from '@/plugins/axios';


export const useTendenciasStore = defineStore('tendencias', () => {

    const tendencias = ref([]);
    const filmeAtual = ref(null);
    let intervaloRotacao = null;

    const getAllTendencias = async (time_window = 'week') => {
        try {
            const response = await TMDBapi.get(`trending/all/${time_window}`, {
                params: { language: 'pt-BR', api_key: ' eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGQ5MDY1MzdiZDUxN2Q0YzRlNjI3YmVlNmYwZmJiMCIsIm5iZiI6MTc1OTQ0Mzc0Mi4zODIwMDAyLCJzdWIiOiI2OGRlZmIxZTBkYjJjNDdmMmUzYjhhMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WdZxeGJU4JZyVewsfZW2SFxSW--WQHb3tMg5jqXarxA' }
            }
            );
            const apenasFilmes = response.data.results.filter(
                (item) => item.media_type === 'movie'
            );

            tendencias.value = apenasFilmes;

            if (tendencias.value.length) {
                filmeAtual.value = tendencias.value[0];
                iniciarRotacao();
            }
        } catch (error) {
            console.error('Erro ao buscar tendências:', error);
        }
    };
    const getDetalhesFilme = async (filme) => {
        try {
            const tipo = filme.media_type === 'movie' ? 'movie' : 'tv';
            const response = await TMDBapi.get(`${tipo}/${filme.id}`, {
                params: { language: 'pt-BR', api_key: 'SUA_API_KEY' }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes:', error);
            return filme; 
        }
    };

    const rotacaoFilmes = async () => {
        if (!tendencias.value.length) return null;
        const indice = Math.floor(Math.random() * tendencias.value.length);
        const filme = tendencias.value[indice];
        const detalhes = await getDetalhesFilme(filme);
        filmeAtual.value = detalhes;
    };


    const iniciarRotacao = () => {
        pararRotacao();
        intervaloRotacao = setInterval(() => {
            filmeAtual.value = rotacaoFilmes();
        }, 4000);
    };

    const pararRotacao = () => {
        if (intervaloRotacao) clearInterval(intervaloRotacao);
    };


    return {
        tendencias,
        filmeAtual,
        getAllTendencias,
        rotacaoFilmes,
        iniciarRotacao,
        pararRotacao
    };
});