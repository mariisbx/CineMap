<script setup>
import AtorBannerComponent from '@/components/AtorBannerComponent.vue';



defineProps({
  atorId: {
    type: String,
    required: true
  }
})
</script>

<template>
<AtorBannerComponent/>

</template>