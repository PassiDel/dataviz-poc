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
import { type DegreeData, degrees, LATEST_YEAR } from '@/data';
import HSBColors from '@/utils/HSBColors';

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
      text: 'Anzahl Studis pro Studiengang pro Fakultät'
    },
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        title: function (context): string {
          return `Fakultät ${context[0].label}`;
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: 'Fakultät'
      }
    },
    y: {
      stacked: true,
      ticks: {
        callback(tickValue) {
          return tickValue.toLocaleString('de');
        }
      }
    }
  }
} satisfies ChartOptions<'bar'>);

function getTotalStudents(degree: DegreeData) {
  return (
    degree.semester.find((s) => s.semester === LATEST_YEAR)?.data?.total || 0
  );
}

function degreeToData(degree: DegreeData) {
  const data = new Array(5).fill(0);
  data[degree.faculty - 1] = getTotalStudents(degree);
  return data;
}
// const campus = ['WS', 'IG', 'ZI', 'NW', 'HÖ'];
</script>

<template>
  <div class="h-[400px] pb-12 md:h-full">
    <ChartDownload>
      <Bar
        :options="chartOptions"
        :data="{
          labels: [1, 2, 3, 4, 5],
          datasets: degrees.map((d) => ({
            label: d.name,
            data: degreeToData(d),
            order: -getTotalStudents(d)
            // backgroundColor: BORDER_COLORS[campus.indexOf(d.campus) || 0]
          }))
        }"
      ></Bar>
    </ChartDownload>
  </div>
</template>

<style scoped></style>
