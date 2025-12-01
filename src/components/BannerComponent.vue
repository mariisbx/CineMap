<script setup>

import { RouterLink } from 'vue-router';
</script>


<template>

    <main>
        <div class="principal">
            <h1>Viaje pelos cenários do cinema!</h1>
            <p>
                Explore no mapa onde cada história ganha vida.
            </p>
            <div class="botoes">
                <RouterLink to="/cinemap">Ver Cinemap</RouterLink>
                <RouterLink to="/filmes">Ver Filmes</RouterLink>
            </div>
        </div>
        <img src="/images/Mapa.png" alt="Mapa">
    </main>

</template>

<style scoped>
main{
    display: flex;
    justify-content: space-between;
    margin-top: -3vw
}
img{
    width: 53vw;
    height: auto;
}
.principal{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin-left: 9vw;
}
h1{
   font-size: 2.5rem;
   font-weight: bold;
   color: #44001A;
}
p{
    font-size: 1.4rem;
    color: #141414;
    margin: 1vw 0 5vw 0
}
div.botoes{
    display: flex;
    gap: 3rem;
}
div.botoes a{
    text-decoration: none;
    background-color: #D3B1B8;
    color: white;
    padding: 10px 50px;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 500;
    transition: background-color 0.3s ease;
}
DIV.botoes a:hover{
    background-color: #C99BA6;
    transition: 1S;
}
</style>