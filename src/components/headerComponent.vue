<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                     <RouterLink to="/"> <img src="/images/Logo.png" alt="Logo"> </RouterLink>
                </li>
                <li>
                    <RouterLink to="/filmes">Filmes</RouterLink>
                </li>
                <li>
                    <RouterLink to="/atores">Atores</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cinemap">CineMap</RouterLink>
                </li>
                <li class="informacao">
                    <span class="mdi mdi-information-outline"></span>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: center;
}
ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
ul li{
    list-style: none;
    margin: 0 30px;
    font-size: 1.1rem;
    font-weight: 600;
}
ul li a{
    text-decoration: none;
    align-items: center;
    color: #141414;
}
ul li a:hover{
    color: #64072b;
    transition: 0.5s;
}
ul li img {
    height: 90px;
    margin-top: 15px;
}
.informacao {
    font-size: 20px;
    margin-left: 60vw;
    color: #44001A;
}
</style>