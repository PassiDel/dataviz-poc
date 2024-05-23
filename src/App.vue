<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <VaLayout :top="{ fixed: true, order: 2 }" class="h-dvh">
    <template #top>
      <VaNavbar color="secondary">
        <template #left>
          <img
            alt="HSB logo"
            src="@/assets/hsb.png"
            class="m-[-20px] md:h-32"
          />
        </template>
        <template #right>
          <div class="flex flex-col gap-4 md:flex-row">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/compare">Vergleich</RouterLink>
            <RouterLink to="/faculty">Fakultäten</RouterLink>
            <RouterLink to="/university">Ganze Hochschule</RouterLink>
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
