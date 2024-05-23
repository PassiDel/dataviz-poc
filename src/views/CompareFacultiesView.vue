<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed } from 'vue';
import { faculties } from '@/data';
import CompareFaculty from '@/components/CompareFaculty.vue';
import { useQuery } from '@/composables/useQuery';

const { selectedLeft, selectedRight } = useQuery();
const leftFaculty = computed(() =>
  faculties.find((f) => f.number === selectedLeft.value)
);
const rightFaculty = computed(() =>
  faculties.find((f) => f.number === selectedRight.value)
);
</script>

<template>
  <main class="flex h-full grid-cols-6 flex-col gap-3 p-3 md:grid">
    <DataSelect v-model:selected="selectedLeft" hide-degrees />
    <CompareFaculty
      v-if="leftFaculty"
      :faculty="leftFaculty"
      class="col-span-2"
    />
    <div v-else class="col-span-2">
      <h2>Wähle links eine Fakultät aus!</h2>
    </div>
    <hr class="my-4 border-2 border-primary md:hidden" />
    <CompareFaculty
      v-if="rightFaculty"
      :faculty="rightFaculty"
      class="col-span-2"
    />
    <div v-else class="col-span-2">
      <h2>Wähle rechts eine Fakultät aus!</h2>
    </div>
    <DataSelect v-model:selected="selectedRight" hide-degrees right />
  </main>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
