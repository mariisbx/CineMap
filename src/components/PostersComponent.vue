<script setup>
import { useFilmesStore } from '@/stores/filmes';

const store = useFilmesStore();
</script>

<template>

  <div class="posters">
    <img
      v-for="p in store.posters"
      :key="p.file_path"
      :src="'https://image.tmdb.org/t/p/w500' + p.file_path"
    >
  </div>
</template>


<style scoped>
.posters{
    display: flex;
    overflow-x: auto;  
    margin: 0 6.5vw;
    gap: 0.3rem;
    margin-top: 2vw;
}
img{
    width: 300px;
    height: 45vh;
    margin-bottom: 15px;
}

.posters::-webkit-scrollbar {
  height: 10px;
}

.posters::-webkit-scrollbar-track {
  background: white;
  border-radius: 10px;
}

.posters::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #c99ba6a6, #ddb8c367);
  border-radius: 10px;
  width: 600px;
}

.posters::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #c99ba6a6, #ddb8c367);
}
</style>