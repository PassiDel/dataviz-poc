<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed } from 'vue';
import { faculties } from '@/data';
import CompareDegree from '@/components/CompareDegree.vue';
import { useQuery } from '@/composables/useQuery';
import CompareFaculty from '@/components/CompareFaculty.vue';

const { left, right } = useQuery({ left: 0, right: 0 });

const leftDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, f })))
    .find((d) => d.number === left.value)
);
const leftFaculty = computed(() =>
  faculties.find((f) => f.number === left.value)
);

const rightDegree = computed(() =>
  faculties
    .flatMap(({ degrees, ...f }) => degrees.map((d) => ({ ...d, f })))
    .find((d) => d.number === right.value)
);
const rightFaculty = computed(() =>
  faculties.find((f) => f.number === right.value)
);
</script>

<template>
  <main class="flex h-full grid-cols-6 flex-col gap-3 p-3 md:grid">
    <DataSelect
      v-model:selected="left"
      :selectedFaculty="leftDegree?.faculty"
    />
    <CompareDegree v-if="leftDegree" :degree="leftDegree" class="degree" />
    <CompareFaculty
      v-else-if="leftFaculty"
      :faculty="leftFaculty"
      class="degree"
    />
    <div v-else class="col-span-2">
      <h2>Wähle links einen Studiengang aus!</h2>
    </div>
    <hr class="my-4 border-2 border-primary md:hidden" />
    <CompareDegree v-if="rightDegree" :degree="rightDegree" class="degree" />
    <CompareFaculty
      v-else-if="rightFaculty"
      :faculty="rightFaculty"
      class="degree"
    />
    <div v-else class="col-span-2">
      <h2>Wähle rechts einen Studiengang aus!</h2>
    </div>
    <DataSelect
      v-model:selected="right"
      :selectedFaculty="rightDegree?.faculty"
      right
    />
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
