<script setup lang="ts">
import { campusMap, type DegreeData } from '@/data';
import GenderNationality from '@/components/charts/GenderNationality.vue';
import DegreeType from '@/components/DegreeType.vue';

const { degree } = defineProps<{
  degree: DegreeData & {
    f: { name: string; number: number };
  };
}>();
</script>

<template>
  <div>
    <h2>{{ degree.name }}</h2>
    <hr class="h-0.5 bg-primary" />
    <GenderNationality :degree="degree" />
    <div class="my-2 grid grid-cols-2 gap-2">
      <p class="text-xl font-bold">
        {{ degree.short }}
      </p>
      <DegreeType :type="degree.type" class="mr-auto" />

      <p>Fakultät {{ degree.f.number }}</p>
      <p>Standort: {{ campusMap(degree.campus) || '' }}</p>
      <p>
        Erfasster Zeitraum:<br />
        <span v-if="degree.semester.length > 1"
          >{{ degree.semester[degree.semester.length - 1].semester }} -
          {{ degree.semester[0].semester }}</span
        >
        <span v-else-if="degree.semester.length === 1">{{
          degree.semester[0].semester
        }}</span>
        <br />({{ degree.semester.length }} Semester)
      </p>
      <p v-if="degree.semester.length > 0">
        Anzahl Studis ({{ degree.semester[0].semester }}):
        {{ degree.semester[0].data.total || 0 }}
      </p>
    </div>
    <hr class="h-0.5 bg-primary" />
    <!--    <RadarYears :degree="degree" />-->
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
