<script setup lang="ts">
import { campusMap, type faculties, sumCalcDegrees, sumDegrees } from '@/data';
import { computed } from 'vue';
import DegreeType from '@/components/DegreeType.vue';
import GenderNationality from '@/components/charts/GenderNationality.vue';

const props = defineProps<{
  faculty: (typeof faculties)[0];
}>();

const computedValues = computed(() => sumCalcDegrees(props.faculty));

const degree = computed(() => sumDegrees(props.faculty));
</script>

<template>
  <div>
    <h2>{{ faculty.name }}</h2>
    <hr class="h-0.5 bg-primary" />
    <GenderNationality :degree="degree" />
    <div class="my-2 grid grid-flow-col grid-cols-2 grid-rows-3 gap-2">
      <h3>{{ faculty.degrees.length }} Studiengänge</h3>
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
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
