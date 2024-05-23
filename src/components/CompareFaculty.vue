<script setup lang="ts">
const { faculty } = defineProps<{
  faculty: {
    name: string;
    number: number;
    degrees: { name: string; slug: string }[];
  };
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
