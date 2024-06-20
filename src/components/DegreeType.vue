<script setup lang="ts">
import type { DegreeData } from '@/data';
import { BORDER_COLORS } from '@/utils/HSBColors';

defineProps<{
  type: DegreeData['type'];
}>();

const colors = {
  Bachelor: BORDER_COLORS[4],
  Master: BORDER_COLORS[1],
  Diplom: BORDER_COLORS[3]
} as const;
</script>

<template>
  <VaChip :color="colors[type]" outline
    ><slot
      ><span class="text-black">{{ type }}</span></slot
    ></VaChip
  >
</template>

<style scoped></style>
