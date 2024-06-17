<script setup lang="ts">
import { categoryMap, type DegreeData, type Semester } from '@/data';
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'vue-chartjs';
import { computed, nextTick, ref, watch } from 'vue';
import ChartDownload from '@/components/ChartDownload.vue';
import HSBColors, { BACKGROUND_COLORS, BORDER_COLORS } from '@/utils/HSBColors';
import { sortSemesterData } from '@/utils/semester';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  HSBColors
);

const props = defineProps<{
  degree: DegreeData;
  year?: Semester;
}>();

const semster = computed(() => sortSemesterData(props.degree.semester));

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  interaction: {
    axis: 'xy',
    mode: 'index'
  },
  elements: {
    point: {
      radius(ctx) {
        return semster.value[ctx.parsed.x]?.semester === props.year ? 6 : 3;
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: semster.value.findIndex((s) => s.semester === props.year),
          xMax: semster.value.findIndex((s) => s.semester === props.year),
          borderWidth: 15,
          borderColor: 'rgba(265, 265, 265, 0.4)',
          drawTime: 'beforeDatasetsDraw'
        }
      }
    },
    title: {
      display: true,
      text: 'Anzahl Studis nach Geschlecht über Semester',
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
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        color: 'black',
        font: {
          size: 15
        }
      }
    }
  }
}));

const line = ref<{ chart: ChartJS }>();
watch(props, () => {
  // really rally ugly, but it works
  nextTick(() => line.value?.chart.update());
});
</script>

<template>
  <ChartDownload>
    <Line
      ref="line"
      :options="chartOptions"
      :data="{
        labels: semster.map((s) => s.semester),
        datasets: [
          {
            label: 'Insgesamt',
            data: semster.map((s) => s.data.total || 0),
            backgroundColor: BACKGROUND_COLORS[7],
            borderColor: BORDER_COLORS[7]
          },
          {
            label: categoryMap.femaleGerman,
            data: semster.map((s) => s.data.femaleGerman || 0),
            backgroundColor: BACKGROUND_COLORS[6],
            borderColor: BORDER_COLORS[6]
          },
          {
            label: categoryMap.maleGerman,
            data: semster.map((s) => s.data.maleGerman || 0),
            backgroundColor: BACKGROUND_COLORS[0],
            borderColor: BORDER_COLORS[0]
          },
          {
            label: categoryMap.diverseGerman,
            data: semster.map((s) => s.data.diverseGerman || 0),
            backgroundColor: BACKGROUND_COLORS[2],
            borderColor: BORDER_COLORS[2]
          }
        ]
      }"
  /></ChartDownload>
</template>

<style scoped></style>
