<script setup lang="ts">
import type { DegreeData } from '@/data';
import {
  Chart as ChartJS,
  type ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import ChartDownload from '@/components/ChartDownload.vue';
import { ref } from 'vue';
import HSBColors from '@/utils/HSBColors';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  HSBColors
);

const { degree } = defineProps<{
  degree: DegreeData;
}>();

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {},
    tooltip: {},
    title: {
      display: true,
      text: 'Relativer Anteil gewisser Merkmale'
    }
  }
} satisfies ChartOptions<'radar'>);
</script>

<template>
  <ChartDownload>
    <Radar
      :options="chartOptions"
      :data="{
        labels: ['% Deutsch', '% Männlich', '% Urlaub'],
        datasets: degree.semester.map((s) => ({
          label: s.semester,
          data: [
            s.data.total && s.data.totalGerman
              ? (s.data.totalGerman * 100) / s.data.total
              : 0,
            s.data.total
              ? ((s.data.maleForeign || 0) + (s.data.maleGerman || 0) * 100) /
                s.data.total
              : 0,
            s.data.total && s.data.totalPause
              ? (s.data.totalPause * 100) / s.data.total
              : 0
          ]
        }))
      }"
  /></ChartDownload>
</template>

<style scoped></style>
