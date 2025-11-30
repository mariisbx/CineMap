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
<button @click="voltar()">Voltar</button>

<AtorBannerComponent/>

</template>