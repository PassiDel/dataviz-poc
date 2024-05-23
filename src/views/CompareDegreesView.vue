<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed, ref } from 'vue';
import { faculties } from '@/data';
import CompareDegree from '@/components/CompareDegree.vue';

const selectedDegreeLeft = ref('');
const selectedDegreeRight = ref('');

const leftDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, faculty: f })))
    .find((d) => d.slug === selectedDegreeLeft.value)
);
const rightDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, faculty: f })))
    .find((d) => d.slug === selectedDegreeRight.value)
);
</script>

<template>
  <main class="grid grid-cols-6 gap-3 p-3">
    <DataSelect v-model:selected="selectedDegreeLeft" />
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
    <DataSelect v-model:selected="selectedDegreeRight" right />
  </main>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
