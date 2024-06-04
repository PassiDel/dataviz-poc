<script setup lang="ts">
import GenderNationality from '@/components/charts/GenderNationality.vue';
import {
  campusMap,
  degrees as _degrees,
  sumCalcDegrees,
  sumDegrees
} from '@/data';
import { provide } from 'vue';
import { HIDE_BUTTONS } from '@/symbols';
import DegreeType from '@/components/DegreeType.vue';
import HSBBarDegrees from '@/components/charts/HSBBarDegrees.vue';

const faculty = { name: 'HSB', number: 0, degrees: _degrees };
const degree = sumDegrees(faculty);

const { dpt, sum, campus } = sumCalcDegrees(faculty);
provide(HIDE_BUTTONS, true);
</script>

<template>
  <h1 class="my-5 w-full text-center text-3xl">Die Hochschule in Zahlen!</h1>
  <div class="flex h-fit grid-cols-5 flex-col gap-3 p-3 md:grid">
    <div class="column col-start-2">
      <GenderNationality :degree="degree" />
    </div>
    <div class="column flex flex-col gap-3">
      <h3>{{ faculty.degrees.length }} Studiengänge</h3>
      <h3>
        {{ campus.length }} Campus
        <VaPopover
          class="mb-2 mr-2"
          :message="campus.map((c) => campusMap(c)).join(', ')"
          color="primary"
        >
          <VaButton icon="help" preset="plain" />
        </VaPopover>
      </h3>
      <h3>{{ sum.toLocaleString('de') }} Studis insgesamt</h3>
      <span v-for="type in dpt" :key="type.type">
        <DegreeType :type="type.type" class="mr-auto" />:
        {{ type.amount }} Studis
      </span>
    </div>
    <div class="column">
      <HSBBarDegrees />
    </div>
  </div>
</template>

<style scoped>
.column {
  @apply rounded-2xl bg-gray-200 p-3;
}
</style>
