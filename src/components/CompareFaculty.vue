<script setup lang="ts">
import type { faculties } from '@/data';

const { faculty } = defineProps<{
  faculty: (typeof faculties)[0];
}>();
</script>

<template>
  <div>
    <h2>{{ faculty.name }}</h2>
    <h3>#{{ faculty.number }}</h3>
    <h3>{{ faculty.degrees.length }} Studiengänge</h3>
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
