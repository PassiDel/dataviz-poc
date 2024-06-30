<script setup lang="ts">
import ChartDownload from '@/components/ChartDownload.vue';
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { type DegreeData, faculties, LATEST_YEAR } from '@/data';
import HSBColors, { BACKGROUND_COLORS, BORDER_COLORS } from '@/utils/HSBColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  HSBColors
);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Anzahl Studis pro Studiengang pro Fakultät',
      padding: {
        top: 20,
        bottom: 10
      },
      font: {
        size: 20
      },
      color: 'black'
    },
    legend: {
      display: false
    },
    tooltip: {
      yAlign: 'bottom'
    }
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: false
      },
      ticks: {
        font: {
          size: 15
        },
        color: 'black'
      }
    },
    y: {
      stacked: true,
      ticks: {
        callback(tickValue) {
          return tickValue.toLocaleString('de');
        },
        font: {
          size: 15
        },
        color: 'black'
      }
    }
  }
} satisfies ChartOptions<'bar'>);

function getTotalStudents(degree: DegreeData) {
  return (
    degree.semester.find((s) => s.semester === LATEST_YEAR)?.data?.total || 0
  );
}
const datasets = [...faculties].flatMap((f) => {
  const degrees = f.degrees.map((d) => ({
    name: d.name,
    value: getTotalStudents(d)
  }));

  degrees.sort((a, b) => b.value - a.value);

  return degrees.map((d, i) => ({
    label: d.name,
    data: valueToData(d.value, f.number),
    backgroundColor:
      i % 2 === 0
        ? BORDER_COLORS[f.number - 1]
        : BACKGROUND_COLORS[f.number - 1]
  }));
});

function valueToData(value: number, faculty: number) {
  const data: number[] = new Array(5).fill(0);
  data[faculty - 1] = value;
  return data;
}
</script>

<template>
  <div class="h-full min-h-[400px] max-w-[90dvw]">
    <ChartDownload>
      <Bar
        :options="chartOptions"
        :data="{
          labels: [1, 2, 3, 4, 5].map((n) => `Fakultät ${n}`),
          datasets: datasets
        }"
      />
    </ChartDownload>
  </div>
</template>

<style scoped></style>
