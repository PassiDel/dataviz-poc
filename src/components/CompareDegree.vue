<script setup lang="ts">
import { campusMap, type DegreeData } from '@/data';
import GenderNationality from '@/components/charts/GenderNationality.vue';
import RadarYears from '@/components/charts/RadarYears.vue';

const { degree } = defineProps<{
  degree: DegreeData & {
    f: { name: string; number: number };
  };
}>();
</script>

<template>
  <div>
    <h2>{{ degree.name }}</h2>
    <div class="my-2 flex flex-col gap-2">
      <p class="text-xl font-bold">
        {{ degree.short }}
      </p>
      <VaChip
        class="mr-auto"
        :color="degree.type === 'Bachelor' ? 'warning' : 'danger'"
        >{{ degree.type }}</VaChip
      >

      <p>Fakultät {{ degree.f.number }}</p>
      <p>Standort: {{ campusMap(degree.campus) || '' }}</p>
      <p>
        {{ degree.semester.length }} Jahre Daten
        <span v-if="degree.semester.length > 1"
          >({{ degree.semester[degree.semester.length - 1].semester }} -
          {{ degree.semester[0].semester }})</span
        >
        <span v-else-if="degree.semester.length === 1"
          >({{ degree.semester[0].semester }})</span
        >
      </p>
      <p v-if="degree.semester.length > 0">
        Anzahl Studis ({{ degree.semester[0].semester }}):
        {{ degree.semester[0].data.total || 0 }}
      </p>
    </div>
    <hr class="h-0.5 bg-primary" />
    <GenderNationality :degree="degree" />
    <RadarYears :degree="degree" />
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
