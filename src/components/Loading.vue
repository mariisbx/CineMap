<template>
 <div class="loading-container">
   <div class="spinner"></div>
   <p class="loading-text">Carregando...</p>
 </div>
</template>


<style scoped>
.loading-container {
 background: #F5F3EE;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 420px;
 width: 100%;
 border-radius: 8px;
}


.spinner {
 width: 58px;
 height: 58px;
 border: 6px solid #D3B1B8;
 border-top-color: #44001A;
 border-radius: 50%;
 animation: spin 0.85s linear infinite;
}


.loading-text {
 margin-top: 16px;
 font-size: 1.1rem;
 color: #141414;
 font-weight: 600;
}


@keyframes spin {
 to {
   transform: rotate(360deg);
 }
}
</style>
