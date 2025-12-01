<script setup>
import { onMounted } from 'vue';
import { useFilmesStore } from '@/stores/filmes';
const store = useFilmesStore();

onMounted(() => {
    store.getTopRatedFilmes();
});

</script>

<template>
    <main>
        <h1>MELHORES AVALIAÇÕES</h1>
        <ul>
            <li v-for="filme in store.filmesMaisBemAvaliados">
                <img :src="'https://image.tmdb.org/t/p/w200' + filme.poster_path" alt="Poster do filme">
                <div class="lado">
                    <div class="informacao">
                        <p class="titulo">{{ filme.title }}</p>
                        <p class="data">{{ filme.release_date }}</p>
                        <button>Ver mais</button>
                    </div>

                    <div class="progresso" :style="{
                        background: `conic-gradient(#44001A ${filme.vote_average * 10 * 3.6}deg, white 0deg)`
                    }">
                        <p>
                            {{ (filme.vote_average * 10).toFixed(1) + '%' }}
                        </p>

                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>

<style scoped>

h1{
  font-size: 2rem;
  font-weight: 700;
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
  text-align: center;
  margin-top: 2vw;
}
@keyframes move-bg {
  0% { background-position: 0 0; }
  100% { background-position: var(--bg-size) 0; }
}
.progresso {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: conic-gradient(white 0deg, #222 0deg);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-weight: 700;
    font-size: 16px;
    color: #44001A;
    box-shadow: 0 0 5px #44001A;
}

.progresso::before {
    content: '';
    position: absolute;
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 50%;
    z-index: 1;
}

.progresso P {
    position: relative;
    z-index: 2;
}

ul{
    display: flex;
    margin: 2vw 9vw;
    justify-content: center;
      gap: 10vw; 
    align-items: center;
}
ul li:first-child{
    font-size: 1.2rem;
    
    & img{
        width: 300px;
        height: auto;   
    }
    & .informacao{
        width: 230px;
    }   
}
ul li img{
    width: 250px;
    height: auto;   
    border-radius: 8px;

}
.lado {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
}
.informacao{
    width: 170px;
}
.informacao p{
     width: 100%; 
}
.titulo{
    font-weight: 700;

}
.data{
    color:#44001aa9;
    margin-top: 10px;
}
button{
    margin-top: 15px;
    padding: 6px 20px;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #44001A;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover{
    background-color: #2e0012;
    transition: 0.5s;
}
</style>