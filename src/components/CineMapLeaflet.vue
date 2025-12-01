<script setup>
import { ref, onMounted, computed } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import * as L from "leaflet";
import { TMDBapi } from "@/plugins/api";
import { countryCoords, getCountryLatLng } from "@/utils/countryCoords";
import markerIcon from "@/assets/icons/marker-44001A.svg";
import Loading from "@/components/Loading.vue";

const zoom = ref(2);
const center = ref([20, 0]);
const countriesList = ref([]);
const filmesSelecionados = ref(null);
const loading = ref(true);

const search = ref("");
const filteredCountries = ref([]);

const paginaAtual = ref(1);
const filmesPorPagina = 20;

const traduzir = new Intl.DisplayNames(["pt"], { type: "region" });

function nomePais(code) {
  return traduzir.of(code) || code;
}

function getIcon() {
  return L.icon({
    iconUrl: markerIcon,
    iconSize: [22, 34],
    iconAnchor: [11, 34],
    popupAnchor: [0, -32],
  });
}

async function buscarFilmesDoPais(code) {
  const filmes = [];

  async function buscarPagina(page) {
    const res = await TMDBapi.get("discover/movie", {
      params: {
        with_origin_country: code,
        page,
        language: "pt-BR"
      }
    });
    return res.data.results.map(f => ({
      id: f.id,
      titulo: f.title,
      poster: f.poster_path
        ? `https://image.tmdb.org/t/p/w500${f.poster_path}`
        : null
    }));
  }

  try {
    const p1 = await buscarPagina(1);
    const p2 = await buscarPagina(2);
    filmes.push(...p1, ...p2);
  } catch {}

  return filmes.slice(0, 100);
}

function irParaPais(pais) {
  center.value = pais.coords;
  zoom.value = 6;
  filmesSelecionados.value = pais;
  paginaAtual.value = 1;
  search.value = "";
  filteredCountries.value = [];
}

function filtrarPaises() {
  const termo = search.value.trim().toLowerCase();
  if (!termo) {
    filteredCountries.value = [];
    return;
  }
  filteredCountries.value = countriesList.value.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );
}

function selecionarPais(pais) {
  filmesSelecionados.value = pais;
  paginaAtual.value = 1;
}

const filmesPaginados = computed(() => {
  if (!filmesSelecionados.value) return [];
  const inicio = (paginaAtual.value - 1) * filmesPorPagina;
  return filmesSelecionados.value.filmes.slice(inicio, inicio + filmesPorPagina);
});

const totalPaginas = computed(() => {
  if (!filmesSelecionados.value) return 1;
  return Math.ceil(filmesSelecionados.value.filmes.length / filmesPorPagina);
});

function mudarPagina(p) {
  paginaAtual.value = p;
}

onMounted(async () => {
  const tasks = Object.keys(countryCoords).map(async iso => {
    const coords = getCountryLatLng(iso);
    if (!coords) return null;

    const filmes = await buscarFilmesDoPais(iso);

    return {
      iso,
      nome: nomePais(iso),
      coords,
      filmes,
      flag: `https://flagcdn.com/w40/${iso.toLowerCase()}.png`,
    };
  });

  const lista = (await Promise.all(tasks)).filter(Boolean);

  countriesList.value = lista;
  loading.value = false;
});
</script>

<template>
  <div class="container">
    <Loading v-if="loading" />

    <div v-else class="content">
      <div class="search-bar">
        <input
          v-model="search"
          @input="filtrarPaises"
          type="text"
          placeholder="Buscar país..."
        />
      </div>

      <ul v-if="filteredCountries.length" class="dropdown-on-map">
        <li v-for="p in filteredCountries" :key="p.iso" @click="irParaPais(p)">
          <img :src="p.flag" class="flag" /> {{ p.nome }}
        </li>
      </ul>

      <div class="mapa">
        <LMap :zoom="zoom" :center="center" :key="center.toString()">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LMarker
            v-for="pais in countriesList"
            :key="pais.iso"
            :lat-lng="pais.coords"
            :icon="getIcon()"
            @click="selecionarPais(pais)"
          >
            <LPopup>
              <div class="popup-content">
                <img :src="pais.flag" class="flag-popup" />
                <span>{{ pais.nome }}</span>
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>

      <div v-if="filmesSelecionados" class="lista-filmes">
        <h3>{{ filmesSelecionados.nome }}</h3>

        <div class="grid-filmes">
          <div v-for="filme in filmesPaginados" :key="filme.id" class="card-filme">
            <img
              v-if="filme.poster"
              :src="filme.poster"
              class="poster"
              alt=""
            />
            <div class="titulo">{{ filme.titulo }}</div>
          </div>
        </div>

        <div class="pagination" v-if="totalPaginas > 1">
          <button
            v-for="p in totalPaginas"
            :key="p"
            @click="mudarPagina(p)"
            :class="{ active: paginaAtual === p }"
          >
            {{ p }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  width: 100%;
}

.search-bar {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 30%;
  min-width: 260px;
  padding: 8px 20px;
  border-radius: 7px;
  background: #d3b1b865;
  color: #ffffff;
  font-size: 15px;
  border: none;
  outline: none;
}

.search-bar input::placeholder {
  color: #ffffff;
  opacity: 1;
}

.dropdown-on-map {
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  background: #ffffff;
  border-radius: 6px;
  max-height: 260px;
  overflow-y: auto;
  z-index: 9999;
}

.dropdown-on-map li {
  padding: 10px;
  cursor: pointer;
  color: #44001A;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dropdown-on-map li:hover {
  background: #D3B1B8;
  color: #141414;
}

.flag {
  height: 18px;
  border-radius: 3px;
}

.flag-popup {
  height: 24px;
  border-radius: 3px;
  margin-right: 8px;
}

.popup-content {
  display: flex;
  align-items: center;
}

.mapa {
  height: 720px;
  width: 100%;
}

.lista-filmes {
  padding: 12px;
  border-radius: 10px;
  margin-top: 30px;
  max-width: 100%;
}

.lista-filmes h3 {
  font-size: 2rem;
  margin-left: 6.5vw;
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
  margin-bottom: 1.5rem;
}

@keyframes move-bg {
  0% { background-position: 0 0; }
  100% { background-position: var(--bg-size) 0; }
}

.grid-filmes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 90px;
  justify-content: center;
  margin: 0 10vw 0 6vw ;
}

.card-filme {
  background: #ffffff;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}

.card-filme:hover {
  transform: scale(1.03);
}

.poster {
  height: 40vh;
  width: 250px;
  border-radius: 8px;
}

.titulo {
  color: #44001A;
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: -37px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.pagination button {
  background: none;
  border: none;
  color: #44001a;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.pagination button.active {
  background: #44001a;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.pagination button:hover:not(.active):not(:disabled) {
  color: #7a0033;
  transform: scale(1.1);
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>

<style>
.leaflet-container {
  font-family: inherit;
}
</style>
