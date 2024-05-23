<script setup lang="ts">
import { faculties } from '@/data';

const totalDegrees = faculties.flatMap((f) => f.degrees).length;
</script>

<template>
  <main class="grid gap-3 p-3 md:grid-cols-3">
    <div class="col-start-2">
      <img alt="HSB logo" src="@/assets/hsb.png" class="mx-auto h-48" />
      <h2>{{ faculties.length }} Fakultäten</h2>
      <h2>{{ totalDegrees }} Studiengänge</h2>
    </div>
  </main>
</template>

<style scoped></style>
