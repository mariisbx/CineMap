<script setup>
import { ref, onMounted } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import * as L from "leaflet";
import { TMDBapi } from "@/plugins/api";
import { getCountryLatLng } from "@/utils/countryCoords";

const zoom = ref(2);
const center = ref([20, 0]);
const countriesList = ref([]);
const filmesSelecionados = ref(null);

const traduzir = new Intl.DisplayNames(["pt"], { type: "region" });

function nomePais(code) {
  return traduzir.of(code) || "País";
}

function getIcon() {
  return L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/oxfist/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [28, 45],
    iconAnchor: [14, 45]
  });
}

onMounted(async () => {
  const { data } = await TMDBapi.get("movie/popular", { params: { page: 1 } });

  const mapa = new Map();

  data.results.forEach((filme) => {
    if (!filme.production_countries) return;

    filme.production_countries.forEach((pais) => {
      const iso = pais.iso_3166_1;
      const coords = getCountryLatLng(iso);
      if (!coords) return;

      const nome = nomePais(iso);

      if (!mapa.has(iso)) {
        mapa.set(iso, {
          iso,
          nome,
          coords,
          filmes: []
        });
      }

      mapa.get(iso).filmes.push(filme.title);
    });
  });

  countriesList.value = Array.from(mapa.values());
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
              <div v-for="(filme, j) in pais.filmes" :key="j">• {{ filme }}</div>
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
        <li v-for="(f, i) in filmesSelecionados.filmes" :key="i">{{ f }}</li>
      </ul>

      <p v-else>Nenhum filme encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.mapa {
  height: 500px;
  width: 100%;
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
