<script setup>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted } from "vue";
import axios from "axios";
import { getCountryLatLng } from "@/utils/countryCoords";

const zoom = ref(2);
const center = ref([20, 0]);
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "© OpenStreetMap contributors";

const countriesList = ref([]);

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

      if (!mapCountries.has(iso)) {
        mapCountries.set(iso, {
          countryName: country.name,
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
      >
        <LPopup>
          <strong>{{ country.countryName }}</strong><br />
          <span v-for="(film, i) in country.filmes" :key="i">
            • {{ film }} <br />
          </span>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>