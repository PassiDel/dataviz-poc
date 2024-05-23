<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed, ref } from 'vue';
import { faculties } from '@/data';
import CompareFaculty from '@/components/CompareFaculty.vue';

const selectedFacultyLeft = ref('');
const selectedFacultyRight = ref('');

const leftFaculty = computed(() =>
  faculties.find((f) => f.name === selectedFacultyLeft.value)
);
const rightFaculty = computed(() =>
  faculties.find((f) => f.name === selectedFacultyRight.value)
);
</script>

<template>
  <main class="grid grid-cols-6 gap-3 p-3">
    <DataSelect v-model:selected="selectedFacultyLeft" hide-degrees />
    <CompareFaculty
      v-if="leftFaculty"
      :faculty="leftFaculty"
      class="col-span-2"
    />
    <div v-else class="col-span-2">
      <h2>Wähle links eine Fakultät aus!</h2>
    </div>
    <CompareFaculty
      v-if="rightFaculty"
      :faculty="rightFaculty"
      class="col-span-2"
    />
    <div v-else class="col-span-2">
      <h2>Wähle rechts eine Fakultät aus!</h2>
    </div>
    <DataSelect v-model:selected="selectedFacultyRight" hide-degrees right />
  </main>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
