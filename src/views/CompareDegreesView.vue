<script setup lang="ts">
import DataSelect from '@/components/DataSelect.vue';
import { computed, ref } from 'vue';
import {
  degrees,
  faculties,
  LATEST_YEAR,
  type Semester,
  sumDegreesAllYears
} from '@/data';
import { useQuery } from '@/composables/useQuery';
import { getSemesterFromDegrees } from '@/utils/semester';
import CompareFaculty from '@/components/CompareFaculty.vue';
import CompareDegree from '@/components/CompareDegree.vue';
import PlayBar from '@/components/PlayBar.vue';

const { left, right } = useQuery({ left: -1, right: -1 });

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

const faculty = { name: 'HS Bremen', number: 0, degrees };
const hsb = {
  f: { name: 'HS Bremen', number: 0 },
  ...sumDegreesAllYears(faculty),
  short: 'HSB'
};

const years = computed<Semester[]>(() =>
  getSemesterFromDegrees(
    leftDegree.value,
    rightDegree.value,
    ...(leftFaculty.value?.degrees ?? []),
    ...(rightFaculty.value?.degrees ?? []),
    ...(left.value === -1 || right.value === -1 ? [hsb] : [])
  )
);

const year = ref<Semester>(LATEST_YEAR);
</script>

<template>
  <main
    class="flex grid-cols-6 flex-col gap-3 pb-24 pt-0 md:grid md:h-full md:pb-3"
  >
    <DataSelect
      v-model:selected="left"
      :selectedFaculty="leftDegree?.faculty"
    />
    <div
      class="col-span-4 flex grid-cols-4 flex-col gap-3 overflow-y-auto pt-3 md:grid md:h-full md:pb-24"
    >
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
      <CompareDegree
        v-else-if="left === -1"
        :year="year"
        :degree="hsb"
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
      <CompareDegree
        v-else-if="right === -1"
        :year="year"
        :degree="hsb"
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
