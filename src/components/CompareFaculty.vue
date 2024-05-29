<script setup lang="ts">
import { type faculties, LATEST_YEAR } from '@/data';
import { computed } from 'vue';

const props = defineProps<{
  faculty: (typeof faculties)[0];
}>();

const computedValues = computed(() => {
  const dpt = props.faculty.degrees.reduce<{ type: string; amount: number }[]>(
    (types, cur) => {
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
    },
    []
  );
  dpt.sort((a, b) => (a.type > b.type ? 1 : -1));

  const sum = props.faculty.degrees
    .filter((d) => d.semester[0].semester === LATEST_YEAR)
    .reduce(
      (count, degree) => count + (degree.semester[0]?.data?.total || 0),
      0
    );
  return { dpt, sum };
});
</script>

<template>
  <div>
    <h2>{{ faculty.name }}</h2>
    <h3>#{{ faculty.number }}</h3>
    <h3>{{ faculty.degrees.length }} Studiengänge</h3>
    <h3>{{ computedValues.sum }} Studis</h3>
    <ul class="ml-8 list-disc">
      <li v-for="type in computedValues.dpt" :key="type.type">
        {{ type.type }}: {{ type.amount }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
