<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed, ref } from 'vue';
import { faculties, type Semester } from '@/data';
import CompareDegree from '@/components/CompareDegree.vue';
import { useQuery } from '@/composables/useQuery';
import CompareFaculty from '@/components/CompareFaculty.vue';
import PlayBar from '@/components/PlayBar.vue';
import { getSemesterFromDegrees } from '@/utils/semester';

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

const years = computed<Semester[]>(() =>
  getSemesterFromDegrees(
    leftDegree.value,
    rightDegree.value,
    ...(leftFaculty.value?.degrees ?? []),
    ...(rightFaculty.value?.degrees ?? [])
  )
);

const year = ref<Semester>(years.value[years.value.length - 1]);
</script>

<template>
  <main class="flex grid-cols-6 flex-col gap-3 p-3 pb-24 md:grid">
    <DataSelect
      v-model:selected="left"
      :selectedFaculty="leftDegree?.faculty"
    />
    <CompareDegree
      v-if="leftDegree"
      :degree="leftDegree"
      :year="year"
      class="degree"
    />
    <CompareFaculty
      v-else-if="leftFaculty"
      :faculty="leftFaculty"
      :year="year"
      class="degree"
    />
    <div v-else class="col-span-2">
      <h2 class="hidden md:block">
        Wähle links einen <span class="font-bold">Studiengang</span><br />
        oder eine <span class="font-bold">Fakultät</span> aus!
      </h2>
      <h2 class="block md:hidden">
        Wähle oben einen <span class="font-bold">Studiengang</span><br />
        oder eine <span class="font-bold">Fakultät</span> aus!
      </h2>
    </div>
    <hr class="my-4 border-2 border-primary md:hidden" />
    <CompareDegree
      v-if="rightDegree"
      :degree="rightDegree"
      :year="year"
      class="degree"
    />
    <CompareFaculty
      v-else-if="rightFaculty"
      :faculty="rightFaculty"
      :year="year"
      class="degree"
    />
    <div v-else class="col-span-2">
      <h2 class="hidden md:block">
        Wähle rechts einen <span class="font-bold">Studiengang</span><br />
        oder eine <span class="font-bold">Fakultät</span> aus!
      </h2>
      <h2 class="block md:hidden">
        Wähle unten einen <span class="font-bold">Studiengang</span><br />
        oder eine <span class="font-bold">Fakultät</span> aus!
      </h2>
    </div>
    <DataSelect
      v-model:selected="right"
      :selectedFaculty="rightDegree?.faculty"
      right
    />
    <PlayBar v-if="years.length > 0" :years="years" v-model="year" />
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
