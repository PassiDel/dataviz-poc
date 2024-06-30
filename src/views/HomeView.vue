<script setup lang="ts">
import GenderNationality from '@/components/charts/GenderNationality.vue';
import {
  campusMap,
  degrees,
  degrees as _degrees,
  faculties,
  sumCalcDegrees,
  sumDegrees
} from '@/data';
import { provide, ref } from 'vue';
import { HIDE_BUTTONS } from '@/symbols';
import DegreeType from '@/components/DegreeType.vue';
import HSBBarDegrees from '@/components/charts/HSBBarDegrees.vue';
import AnimatedSelection from '@/components/AnimatedSelection.vue';

const faculty = { name: 'HSB', number: 0, degrees: _degrees };
const degree = sumDegrees(faculty);

const { dpt, sum, campus } = sumCalcDegrees(faculty);
provide(HIDE_BUTTONS, true);

const options = [
  ...degrees.map(({ name, number }) => ({ name, number })),
  ...faculties.map(({ name, number }) => ({ name, number }))
];
const selectLeft = ref(0);
const selectRight = ref(0);
</script>

<template>
  <h1 class="my-5 w-full text-center text-3xl">Die Hochschule in Zahlen!</h1>
  <div
    class="md:min-h-1/2 mb-8 flex w-full grid-cols-4 flex-col items-center gap-3 p-3 md:mx-auto md:grid md:max-h-[50dvh] md:w-[80dvw] md:items-stretch"
  >
    <div class="column flex justify-center">
      <GenderNationality :degree="degree" />
    </div>
    <div class="column flex flex-col gap-3">
      <h3>{{ faculty.degrees.length }} Studiengänge</h3>
      <span v-for="type in dpt" :key="type.type" class="ml-4">
        <span class="inline-block w-8">{{ type.amount }} x</span>
        <DegreeType :type="type.type" class="mr-auto" />
      </span>
      <h3>
        {{ campus.length }} Standorte
        <VaPopover
          class="mb-2 mr-2"
          :message="campus.map((c) => campusMap(c)).join(', ')"
          color="primary"
        >
          <VaButton icon="help" preset="plain" />
        </VaPopover>
      </h3>
      <h3>{{ sum.toLocaleString('de') }} Studis insgesamt</h3>
      <span
        v-for="type in dpt.filter((t) => t.students > 0)"
        :key="type.type"
        class="ml-4"
      >
        <span class="inline-block w-14"
          >{{ type.students.toLocaleString('de') }} x</span
        >
        <DegreeType :type="type.type" class="mr-auto" />
      </span>
    </div>
    <div class="column col-span-2">
      <HSBBarDegrees />
    </div>
  </div>
  <div
    class="mx-auto mt-4 flex w-fit flex-col items-center gap-2 text-2xl md:block"
  >
    Vergleiche
    <AnimatedSelection v-model:selected="selectLeft" :options="options" />
    mit
    <AnimatedSelection v-model:selected="selectRight" :options="options" />
    <VaButton
      icon="open_in_new"
      class="mb-12 w-24 md:ml-4"
      :to="`/compare?left=${selectLeft}&right=${selectRight}`"
    />
  </div>
</template>

<style scoped>
h3 {
  @apply mt-3 text-xl font-bold;
}
.column {
  @apply rounded-2xl bg-gray-200 p-3;
}
</style>
