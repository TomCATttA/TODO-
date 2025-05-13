<script setup>
  
</script>

<template>
<div class="app-container">
<div class="body">
  <router-view></router-view>
</div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  justify-content: center; 
  align-items: center;    
  min-height: 100vh;      
  margin: 0;
  padding: 0;
}

  .body{
    width: 1300px;
    height:700px;
    background: rgba(240, 239, 239, 0.815);
    border-radius: 10px;
  }
</style>
