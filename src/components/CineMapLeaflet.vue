<script setup>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted } from "vue";
import axios from "axios";
import { getCountryLatLng } from "@/utils/countryCoords";
import * as L from 'leaflet'; 

const zoom = ref(2);
const center = ref([20, 0]);
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "Mapa &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> colaboradores";

const countriesList = ref([]);

function getCountryIcon(iso) {
    let iconUrl;

    switch (iso) {
        case 'BR': iconUrl = '/icones/bandeira-br.png'; break;
        case 'PT': iconUrl = '/icones/bandeira-pt.png'; break;
        case 'US': iconUrl = '/icones/estrela-eua.png'; break;
        default: iconUrl = '/icones/icone-padrao.png'; break;
    }

    return L.icon({
        iconUrl: iconUrl,
        iconSize: [36, 36], 
        iconAnchor: [18, 36], 
        popupAnchor: [0, -36] 
    });
}

const countryNameTranslator = new Intl.DisplayNames(['pt'], { type: 'region' });

function getTranslatedCountryName(isoCode) {
    const translatedName = countryNameTranslator.of(isoCode);
    
    return translatedName || 'País Desconhecido';
}

onMounted(async () => {
    const apiKey = "34d906537bd517d4c4e627bee6f0fbb0";

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
    );

    const movies = data.results;
    const mapCountries = new Map();

    movies.forEach((movie) => {
        if (!movie.production_countries) return;

        movie.production_countries.forEach((country) => {
            const iso = country.iso_3166_1;
            const coords = getCountryLatLng(iso);

            if (!coords) return;
          
            const translatedName = getTranslatedCountryName(iso);

            if (!mapCountries.has(iso)) {
                mapCountries.set(iso, {
                    iso: iso,
                    countryName: translatedName, 
                    filmes: [movie.title],     
                    coords,
                });
            } else {
                mapCountries.get(iso).filmes.push(movie.title);
            }
        });
    });

    countriesList.value = Array.from(mapCountries.values());
});
</script>

<template>
  <div id="map-container">
    <LMap
      style="height: 500px; width: 100%;"
      :zoom="zoom"
      :center="center"
    >
      <LTileLayer :url="url" :attribution="attribution" />
      <LMarker
        v-for="(country, index) in countriesList"
        :key="index"
        :lat-lng="country.coords"
        :icon="getCountryIcon(country.iso)"
      >
        <LPopup>
          <strong>País de Produção: {{ country.countryName }}</strong><br />
          <hr style="margin: 5px 0;">
          <p>Filmes populares produzidos aqui:</p>
          <span v-for="(film, i) in country.filmes" :key="i">
            • {{ film }} <br />
          </span>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>