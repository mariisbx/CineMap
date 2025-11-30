<script setup>
import { onMounted } from 'vue';
import { useActorsStore } from '@/stores/atores';
import { useRouter } from 'vue-router'

const store = useActorsStore();

onMounted(() => {
    store.getPopularAtores();
});


const router = useRouter()

const irParaDetalhes = (id) => {
    router.push({
    path: `/atores/${id}`,
    query: { from: 'Home' }
  })

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

</script>


<template>
    <main>
        <h1>ATORES POPULARES</h1>
        <section>
            <div v-for="ator in store.popularesAtores" :key="ator.id" class="ator-card">
                <img :src="`https://image.tmdb.org/t/p/w200${ator.profile_path}`" :alt="ator.name" />
                <h4>{{ ator.name }}</h4>
                <p>{{ ator.known_for[0].title || ator.known_for[0].name }}</p>
               <button @click="irParaDetalhes(ator.id)">Ver mais</button>

            </div>
        </section>
    </main>

</template>

<style scoped>
main {
    --bg-size: 400%;
    --color-one: #44001a;
    --color-two: #5c0224;
    background: linear-gradient(90deg,
            var(--color-one),
            var(--color-two),
            var(--color-one)) 0 0 / var(--bg-size) 100%;
    animation: move-bg 8s infinite linear;
    margin-bottom: 2rem;
    padding-top: 40px;

}
@keyframes move-bg {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: var(--bg-size) 0;
    }
}
h1{
    text-align: center;
    color: white;
    font-size: 1.4rem;
}

section{
    display: flex;
    justify-content: center;
    gap: 5vw;
    overflow-x: auto;
    padding: 40px;
    color: white;
}

img {
    width: 240px;
}
h4 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 6px 0 10px 0;
}
p {
    font-size: 1rem;
    margin-bottom: 30px;
}
button{
    background-color: white;
    border-radius: 6px;
    border: none;
    color: #44001a;
    width: 90%;
    padding: 3px 7px;
    font-size: 1.04rem;
    cursor: pointer;
    font-weight: 600;
    margin-top: auto;
}
button:hover{
    background-color: #b17b88;
    color: white;
    transition: 0.5s;
    align-items: center;
}
.ator-card {
    display: flex;
    flex-direction: column;

    /* Para todos terem a mesma altura */
    min-height: 380px;

    /* Mantém eles proporcionais */
    width: 15%;
}

</style>