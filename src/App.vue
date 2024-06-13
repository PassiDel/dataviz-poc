<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import logo from '@/assets/logo_hsb_startseite.svg';
</script>

<template>
  <VaLayout :top="{ fixed: true, order: 2 }" class="h-dvh">
    <template #top>
      <VaNavbar class="test">
        <template #left
          ><RouterLink to="/" class="flex flex-row text-white"
            ><img :src="logo" class="h-10" alt="Logo HSB" /><span
              class="my-auto"
              >Die Hochschule in Zahlen!</span
            ></RouterLink
          ></template
        >
        <template #right>
          <div class="flex flex-col gap-2 text-white md:flex-row md:gap-4">
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

<style scoped>
.test {
  background: linear-gradient(to right, rgb(10, 85, 140), rgb(50, 180, 200));
}
</style>
