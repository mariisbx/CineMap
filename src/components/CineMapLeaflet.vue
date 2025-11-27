<script setup>
import { ref, onMounted } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import * as L from "leaflet";
import { TMDBapi } from "@/plugins/api";
import { countryCoords, getCountryLatLng } from "@/utils/countryCoords";
import markerIcon from "@/assets/icons/marker-44001A.svg";

const zoom = ref(2);
const center = ref([20, 0]);
const countriesList = ref([]);
const filmesSelecionados = ref(null);

const traduzir = new Intl.DisplayNames(["pt"], { type: "region" });

function nomePais(code) {
  return traduzir.of(code) || code;
}

function getIcon() {
  return L.icon({
    iconUrl: markerIcon,
    iconSize: [22, 34],
    iconAnchor: [11, 34],
    popupAnchor: [0, -32]
  });
}

async function buscarFilmesDoPais(code) {
  try {
    const { data } = await TMDBapi.get("discover/movie", {
      params: {
        with_origin_country: code,
        page: 1
      }
    });
    return data.results.map(f => f.title);
  } catch {
    return [];
  }
}

onMounted(async () => {
  const lista = [];

  for (const iso in countryCoords) {
    const coords = getCountryLatLng(iso);
    if (!coords) continue;

    const filmes = await buscarFilmesDoPais(iso);

    lista.push({
      iso,
      nome: nomePais(iso),
      coords,
      filmes
    });
  }

  countriesList.value = lista;
});
</script>

<template>
  <div class="container">
    <div class="mapa">
      <LMap :zoom="zoom" :center="center">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <LMarker
          v-for="(pais, i) in countriesList"
          :key="i"
          :lat-lng="pais.coords"
          :icon="getIcon()"
          @click="filmesSelecionados = pais"
        >
          <LPopup>
            <strong>{{ pais.nome }}</strong><br />
            ISO: {{ pais.iso }}<br /><br />

            <div v-if="pais.filmes.length">
              <div v-for="(filme, j) in pais.filmes" :key="j">
                • {{ filme }}
              </div>
            </div>

            <div v-else>
              Nenhum filme encontrado.
            </div>
          </LPopup>
        </LMarker>
      </LMap>
    </div>

    <div v-if="filmesSelecionados" class="lista-filmes">
      <h3>{{ filmesSelecionados.nome }}</h3>

      <ul v-if="filmesSelecionados.filmes.length">
        <li v-for="(f, i) in filmesSelecionados.filmes" :key="i">
          {{ f }}
        </li>
      </ul>

      <p v-else>Nenhum filme encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.mapa {
  height: 720px;
  width: 100%;
  margin: 0 auto;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.lista-filmes {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>

<style>
.leaflet-container {
  font-family: inherit;
}
</style>
