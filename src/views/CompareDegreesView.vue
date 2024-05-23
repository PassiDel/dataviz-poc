<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed } from 'vue';
import { faculties } from '@/data';
import CompareDegree from '@/components/CompareDegree.vue';
import { useQuery } from '@/composables/useQuery';

const { selectedLeft, selectedRight } = useQuery();

const leftDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, faculty: f })))
    .find((d) => d.slug === selectedLeft.value)
);
const rightDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, faculty: f })))
    .find((d) => d.slug === selectedRight.value)
);
</script>

<template>
  <main class="grid grid-cols-6 gap-3 p-3">
    <DataSelect v-model:selected="selectedLeft" />
    <CompareDegree v-if="leftDegree" :degree="leftDegree" class="col-span-2" />
    <div v-else class="col-span-2">
      <h2>Wähle links einen Studiengang aus!</h2>
    </div>
    <CompareDegree
      v-if="rightDegree"
      :degree="rightDegree"
      class="col-span-2"
    />
    <div v-else class="col-span-2">
      <h2>Wähle rechts einen Studiengang aus!</h2>
    </div>
    <DataSelect v-model:selected="selectedRight" right />
  </main>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
