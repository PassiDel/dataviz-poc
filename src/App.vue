<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <VaLayout :top="{ fixed: true, order: 2 }" class="h-dvh">
    <template #top>
      <VaNavbar color="secondary">
        <template #left
          ><RouterLink to="/">Die Hochschule in Zahlen!</RouterLink></template
        >
        <template #right>
          <div class="flex flex-col gap-2 md:flex-row md:gap-4">
            <RouterLink to="/" activeClass="font-bold" class="hover:underline"
              >Start</RouterLink
            >
            <RouterLink
              to="/compare"
              activeClass="font-bold"
              class="hover:underline"
              >Vergleich</RouterLink
            >
            <RouterLink
              to="/graph"
              activeClass="font-bold"
              class="hover:underline"
              >Alles</RouterLink
            >
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
