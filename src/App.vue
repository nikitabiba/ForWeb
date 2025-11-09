<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/prizes" class="nav_links">Нобелевские премии</RouterLink>
      <RouterLink to="/laureats" class="nav_links">Лауреаты нобелевской премии</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/styles.css';
</style>