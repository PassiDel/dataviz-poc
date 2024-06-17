<script setup lang="ts">
import {
  campusMap,
  type faculties,
  type Semester,
  sumCalcDegrees,
  sumDegrees,
  sumDegreesAllYears
} from '@/data';
import { computed } from 'vue';
import DegreeType from '@/components/DegreeType.vue';
import GenderNationality from '@/components/charts/GenderNationality.vue';
import DegreeHistoryGender from '@/components/charts/DegreeHistoryGender.vue';
import DegreeHistoryForeign from '@/components/charts/DegreeHistoryForeign.vue';

const props = defineProps<{
  faculty: (typeof faculties)[0];
  year: Semester;
}>();

const computedValues = computed(() =>
  sumCalcDegrees(props.faculty, props.year)
);

const degree = computed(() => sumDegrees(props.faculty, props.year));
const degrees = computed(() => sumDegreesAllYears(props.faculty));
</script>

<template>
  <div>
    <h2>{{ faculty.name }}</h2>
    <hr class="h-0.5 bg-primary" />
    <GenderNationality :degree="degree" :year="year" />
    <div class="my-2 grid h-36 grid-flow-col grid-cols-2 grid-rows-3 gap-2">
      <h3>{{ computedValues.sumDegrees }} Studiengänge</h3>
      <h3>{{ computedValues.sum.toLocaleString('de') }} Studis</h3>
      <h3>
        {{ computedValues.campus.length }} Standorte
        <VaPopover
          class="mb-2 mr-2"
          :message="computedValues.campus.map((c) => campusMap(c)).join(', ')"
          color="primary"
        >
          <VaButton icon="help" preset="plain" />
        </VaPopover>
      </h3>
      <span v-for="type in computedValues.dpt" :key="type.type">
        <span class="inline-block w-10"
          >{{ type.amount.toLocaleString('de') }} x</span
        >
        <DegreeType :type="type.type" class="" />
        <span class="float-right mr-2 inline-block"
          >{{ type.students.toLocaleString('de') }} Studis</span
        >
      </span>
    </div>
    <hr class="h-0.5 bg-primary" />
    <DegreeHistoryGender :degree="degrees" :year="year" />
    <hr class="mt-2 h-0.5 bg-primary" />
    <DegreeHistoryForeign :degree="degrees" :year="year" />
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
