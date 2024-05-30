<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <VaLayout :top="{ fixed: true, order: 2 }" class="h-dvh">
    <template #top>
      <VaNavbar color="secondary">
        <template #left> HSB </template>
        <template #right>
          <div class="flex flex-col gap-2 md:flex-row md:gap-4">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/compare">Vergleich</RouterLink>
            <RouterLink to="/faculty">Fakultäten</RouterLink>
            <RouterLink to="/university">Ganze Hochschule</RouterLink>
            <RouterLink to="/graph">Graph</RouterLink>
          </div>
        </template>
      </VaNavbar>
    </template>
    <template #content>
      <RouterView />
    </template>
  </VaLayout>
</template>

<style scoped></style>
