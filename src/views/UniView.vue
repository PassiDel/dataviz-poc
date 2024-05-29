<script setup lang="ts">
import { degrees, faculties, LATEST_YEAR } from '@/data';

const totalDegrees = faculties.flatMap((f) => f.degrees).length;
const degreePerType = degrees.reduce<{ type: string; amount: number }[]>(
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
const degreePerFaculty = degrees.reduce<{ faculty: number; amount: number }[]>(
  (types, cur) => {
    const type = types.find((s) => s.faculty === cur.faculty);
    if (!type) {
      types.push({
        faculty: cur.faculty,
        amount: 1
      });
      return types;
    }
    type.amount++;
    return types;
  },
  []
);

degreePerFaculty.sort((a, b) => a.faculty - b.faculty);
degreePerType.sort((a, b) => b.amount - a.amount);
const sum = degrees
  .filter((d) => d.semester[0].semester === LATEST_YEAR)
  .reduce((count, degree) => count + (degree.semester[0]?.data?.total || 0), 0);
</script>

<template>
  <main class="grid gap-3 p-3 md:grid-cols-3">
    <div class="col-start-2">
      <img alt="HSB logo" src="@/assets/hsb.png" class="mx-auto h-48" />
      <h2>{{ sum }} Studis</h2>
      <h2>{{ faculties.length }} Fakultäten</h2>
      <ul class="ml-8 list-disc">
        <li v-for="fk in degreePerFaculty" :key="fk.faculty">
          Fakultät {{ fk.faculty }}: {{ fk.amount }}
        </li>
      </ul>
      <h2 class="mt-3">{{ totalDegrees }} Studiengänge</h2>
      <ul class="ml-8 list-disc">
        <li v-for="type in degreePerType" :key="type.type">
          {{ type.type }}: {{ type.amount }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
h2 {
  @apply font-bold;
}
</style>
