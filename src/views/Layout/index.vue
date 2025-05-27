<script setup>
import NavList from "./components/NavList/index.vue"
</script> 

<template>
    <div class="body">
        <nav-list></nav-list>
        <router-view></router-view>
    </div>
    
</template>

<style scoped lang="scss">
    .body{
        display: flex;
    }
</style>