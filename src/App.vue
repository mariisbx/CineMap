<script setup>
import { RouterView } from 'vue-router';
import headerComponent from './components/headerComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
    <headerComponent />
    <main>
        <RouterView/>
    </main>
    <FooterComponent />
</template>

<style scoped>

</style>
