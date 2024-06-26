<script setup lang="ts">
import { campusMap, type DegreeData, type Semester } from '@/data';
import GenderNationality from '@/components/charts/GenderNationality.vue';
import DegreeType from '@/components/DegreeType.vue';
import DegreeHistoryGender from '@/components/charts/DegreeHistoryGender.vue';
import DegreeHistoryForeign from '@/components/charts/DegreeHistoryForeign.vue';

defineProps<{
  degree: DegreeData & {
    f: { name: string; number: number };
  };
  year: Semester;
}>();
</script>

<template>
  <div>
    <h2>{{ degree.name }}</h2>
    <hr class="h-0.5 bg-primary" />
    <GenderNationality :degree="degree" :year="year" />
    <div class="my-2 grid h-36 grid-cols-2 gap-2">
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
      <p>
        Anzahl Studis ({{ year }}):
        {{
          degree.semester
            .find((s) => s.semester === year)
            ?.data?.total?.toLocaleString('de') || 0
        }}
        <br />
        Anzahl Studienanfänger:
        {{
          degree.semester
            .find((s) => s.semester === year)
            ?.data?.totalBeginner?.toLocaleString('de') || 0
        }}
      </p>
    </div>
    <hr class="h-0.5 bg-primary" />
    <DegreeHistoryGender :degree="degree" :year="year" />
    <hr class="h-0.5 bg-primary" />
    <DegreeHistoryForeign :degree="degree" :year="year" />
  </div>
</template>

<style scoped>
h2 {
  @apply text-center text-2xl;
}
</style>
