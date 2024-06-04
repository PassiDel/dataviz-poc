<script setup lang="ts">
import type { DegreeData } from '@/data';

defineProps<{
  type: DegreeData['type'];
}>();

const colors = {
  Bachelor: 'warning',
  Master: 'danger',
  Diplom: 'info'
} as const;
</script>

<template>
  <VaChip class="mr-auto" :color="colors[type]">{{ type }}</VaChip>
</template>

<style scoped></style>
