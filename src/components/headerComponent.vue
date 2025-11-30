<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mostrarInfo = ref(false)

const toggleInfo = () => {
    mostrarInfo.value = !mostrarInfo.value
}

const fecharInfo = () => {
    mostrarInfo.value = false
}
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/" class="logo">
                        <img src="/images/Logo.png" alt="Logo" />
                    </RouterLink>
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

                <li class="informacao" @click="toggleInfo">
                    <span class="mdi mdi-information-outline"></span>
                </li>
            </ul>
        </nav>

        <div v-if="mostrarInfo" class="aba-info">

            <span class="fechar" @click="fecharInfo">✖</span>

            <h3>Sobre nós</h3>
            <p>
                O CineMap é uma plataforma que facilita a descoberta de filmes a partir de suas localidades de origem.
                Conectamos pessoas a experiências cinematográficas através de um mapa interativo que mostra, por país,
                os filmes produzidos ali. Nossa equipe reúne desenvolvedoras e amantes de cinema dedicadas a manter o
                site atualizado, acessível e fácil de usar.
            </p>

            <h4>O que fazemos?</h4>
            <ul>
                <li>• Exibimos marcos de localização por país.</li>
                <li>• Mostramos os filmes produzidos em cada região.</li>
                <li>• Integramos informações sobre elenco e detalhes da obra.</li>
                <li>• Tornamos a exploração cinematográfica mais simples, visual e interativa.</li>
            </ul>

            <h4>Desenvolvedoras</h4>
            <div class="devs">
                <div class="dev">
                    <div class="info">
                        <img src="/images/LauraEloysa.jpeg">
                        <span>Laura Eloysa <p>17 anos</p></span>
                    </div>

                    <div class="redes">
                            <a href="https://github.com/LauraEloysa" target="_blank">
                                <span class="mdi mdi-github"></span>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lauraeloysad@gmail.com" target="_blank">
                                <span class="mdi mdi-gmail"></span>
                            </a>
                    </div>

                </div>
                <div class="dev">
                    <div class="info">
                        <img src="/images/MariaAparecida.jpeg">
                        <span>Maria Aparecida <p>17 anos</p></span>
                    </div>

                    <div class="redes">
                          <a href="https://github.com/mariisbx" target="_blank">
                                <span class="mdi mdi-github"></span>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mariaaparecida.ifc.araquari@gmail.com" target="_blank">
                                <span class="mdi mdi-gmail"></span>
                            </a>
                    </div>
                </div>
            </div>

            <h4>Como contribuir</h4>
            <div class="contribuicao">
                <p>
                    O CineMap cresce com a ajuda da comunidade! </br> Você pode:
                </p>

                <ul>
                    <li>
                       • Reportar informações incorretas.
                    </li>
                    <li>
                       • Enviar feedbacks ou sugestões de melhoria.
                    </li>
                </ul>
            </div>
        </div>


        <div v-if="mostrarInfo" class="overlay" @click="fecharInfo"></div>

    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

ul li {
    list-style: none;
    margin: 0 30px;
    font-size: 1.1rem;
    font-weight: 600;
}

ul li a {
    text-decoration: none;
    color: #141414;
}

ul li a:hover {
    color: #64072b;
    transition: 0.5s;
}

ul li img {
    height: 90px;
    margin-top: 15px;
}

.informacao {
    font-size: 22px;
    margin-left: 60vw;
    color: #44001A;
    cursor: pointer;
}

ul li a.router-link-exact-active {
    color: #D3B1B8;
    font-weight: 700;
}

/* ---------------------------- */
/* ABA FLUTUANTE */
/* ---------------------------- */

.aba-info {
    position: fixed;
    top: 5px;
    right: 50px;
    width: 350px;
    background: #fdf9f7;
    padding: 25px;
    border-radius: 12px;
    z-index: 1001;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: aparecer 0.3s ease;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.aba-info h3 {
    color: #44001A;
    margin-bottom: 10px;
}

.aba-info h4 {
    color: #44001A;
    margin-top: 20px;
    margin-bottom: 10px;
}

.aba-info p,
.aba-info li {
    font-size: 0.95rem;
    line-height: 1.4;
    color: #333;
}

.aba-info ul {
    display: block;
    padding-left: 0;
}

.aba-info li {
    list-style: none;
    margin-bottom: 5px;
}


.devs {
    gap: 15px;
    margin-top: 10px;
    align-items: center;
}

.dev {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    margin-bottom: 1vw;
    justify-content: space-between;
}
.mdi{
    font-size: 1.3rem;
    margin-right: 10px;
    color: #64072b;
}
.dev .info{
    display: flex;
}
.dev .info span{
    margin-left: 8px;
}
.dev img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
}


.fechar {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 1.1rem;
    color: #44001A;
}


.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
}
</style>
