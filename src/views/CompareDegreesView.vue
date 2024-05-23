<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed } from 'vue';
import { faculties } from '@/data';
import CompareDegree from '@/components/CompareDegree.vue';
import { useQuery } from '@/composables/useQuery';

const { selectedLeft, selectedRight } = useQuery();

const leftDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, f })))
    .find((d) => d.number === selectedLeft.value)
);
const rightDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, f })))
    .find((d) => d.number === selectedRight.value)
);
</script>

<template>
  <main class="flex h-full grid-cols-6 flex-col gap-3 p-3 md:grid">
    <DataSelect v-model:selected="selectedLeft" />
    <CompareDegree v-if="leftDegree" :degree="leftDegree" class="degree" />
    <div v-else class="col-span-2">
      <h2>Wähle links einen Studiengang aus!</h2>
    </div>
    <hr class="my-4 border-2 border-primary md:hidden" />
    <CompareDegree v-if="rightDegree" :degree="rightDegree" class="degree" />
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

.degree {
  @apply col-span-2 rounded-2xl bg-gray-200 p-2 px-3;
}
</style>
