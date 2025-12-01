<script setup>
import { ref, onMounted } from "vue";
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
 const filmes = [];
 try {
   const p1 = await TMDBapi.get("discover/movie", {
     params: { with_origin_country: code, page: 1 }
   });
   filmes.push(...p1.data.results.map(f => f.title));
 } catch {}
 try {
   const p2 = await TMDBapi.get("discover/movie", {
     params: { with_origin_country: code, page: 2 }
   });
   filmes.push(...p2.data.results.map(f => f.title));
 } catch {}
 return filmes.slice(0, 40);
}


function irParaPais(pais) {
 center.value = pais.coords;
 zoom.value = 6;
 filmesSelecionados.value = pais;
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
     flag: `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
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
       <ul v-if="filmesSelecionados.filmes.length">
         <li v-for="(f, i) in filmesSelecionados.filmes" :key="i">{{ f }}</li>
       </ul>
       <p v-else>Nenhum filme encontrado.</p>
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
 background: #FFFFFF;
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
 border: 1px solid #C99BA6;
 border-radius: 10px;
 background: #F5F3EE;
 margin-top: 20px;
 max-width: 380px;
}


.lista-filmes h3 {
 color: #44001A;
}
</style>


<style>
.leaflet-container {
 font-family: inherit;
}
</style>
