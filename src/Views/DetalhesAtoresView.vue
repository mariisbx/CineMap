<script setup>
import AtorBannerComponent from '@/components/AtorBannerComponent.vue';
import { useRoute, useRouter } from 'vue-router'

defineProps({
  atorId: {
    type: String,
    required: true
  }
})


const router = useRouter()
const route = useRoute()

function voltar() {

  if (route.query.from === 'Home') {
    router.push({ name: 'Home' })
  } 
  else if (route.query.from === 'atores') {
    const page = route.query.page || 1
    router.push({ name: 'atores', query: { page } })
  } 

    else{
      console.log('erro')
    }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}



</script>

<template>
<button @click="voltar()">
  <span class="mdi mdi-arrow-left"></span>
  Voltar
</button>

<AtorBannerComponent/>

</template>

<style scoped>
button{
  background-color: white;
  border: none;
  font-size: 1.1rem;
  color: #44001a;
  margin-left: 6.5rem;
  align-items: center;
  margin-top: 1vw ;
  margin-bottom: 1vw;
  cursor: pointer;
}
button:hover{
  color: #aa0041;
  transition: 1s;
}
.mdi{
  font-size: 1.3rem;
}
</style>