<script setup lang="ts">
import {
  campusMap,
  type DegreeData,
  type faculties,
  LATEST_YEAR,
  sumDegrees
} from '@/data';
import { computed } from 'vue';
import DegreeType from '@/components/DegreeType.vue';
import GenderNationality from '@/components/charts/GenderNationality.vue';

const props = defineProps<{
  faculty: (typeof faculties)[0];
}>();

const computedValues = computed(() => {
  const dpt = props.faculty.degrees.reduce<
    { type: DegreeData['type']; amount: number }[]
  >((types, cur) => {
    const type = types.find((s) => s.type === cur.type);
    if (!type) {
      types.push({
        type: cur.type,
        amount: 1
      });
      return types;
    }
    type.amount++;
    return types;
  }, []);
  dpt.sort((a, b) => (a.type > b.type ? 1 : -1));

  const sum = props.faculty.degrees
    .filter((d) => d.semester[0].semester === LATEST_YEAR)
    .reduce(
      (count, degree) => count + (degree.semester[0]?.data?.total || 0),
      0
    );

  const campus = new Set<DegreeData['campus']>();
  props.faculty.degrees.forEach((d) => campus.add(d.campus));
  return { dpt, sum, campus: [...campus] };
});

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
        {{ computedValues.campus.length }} Campus
        <VaPopover
          class="mb-2 mr-2"
          :message="computedValues.campus.map((c) => campusMap(c)).join(', ')"
          color="primary"
        >
          <VaButton icon="help" preset="plain" />
        </VaPopover>
      </h3>
      <span v-for="type in computedValues.dpt" :key="type.type">
        <DegreeType :type="type.type" class="mr-auto" />: {{ type.amount }}
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
