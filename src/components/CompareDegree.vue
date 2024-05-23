<script setup lang="ts">
import type { DegreeData } from '@/data';

const { degree } = defineProps<{
  degree: DegreeData & {
    f: { name: string; number: number };
  };
}>();
</script>

<template>
  <div>
    <h2>{{ degree.name }}</h2>
    <h3>{{ degree.f.name }}</h3>
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
