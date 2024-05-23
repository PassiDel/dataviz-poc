<script setup lang="ts">
const { degree } = defineProps<{
  degree: {
    faculty: { name: string; number: number };
    name: string;
    slug: string;
  };
}>();
</script>

<template>
  <div>
    <h2>{{ degree.name }}</h2>
    <h3>{{ degree.faculty.name }}</h3>
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
