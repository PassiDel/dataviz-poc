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
import { sortSemesterData, sumYears } from '@/utils/semester';

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

const semester = computed(() =>
  sumYears(sortSemesterData(props.degree.semester))
);

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    axis: 'xy',
    mode: 'index'
  },
  elements: {
    point: {
      radius(ctx) {
        return semester.value[ctx.parsed.x]?.semester.endsWith(
          props.year?.substring(4) || ''
        )
          ? 6
          : 3;
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: semester.value.findIndex((s) =>
            s.semester.endsWith(props.year?.substring(4) || '')
          ),
          xMax: semester.value.findIndex((s) =>
            s.semester.endsWith(props.year?.substring(4) || '')
          ),
          borderWidth: 15,
          borderColor: 'rgba(265, 265, 265, 0.4)',
          drawTime: 'beforeDatasetsDraw'
        }
      }
    },
    title: {
      display: true,
      text: 'Anzahl Studienanfänger nach Geschlecht über Jahr',
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
  <div class="h-[400px] pb-12">
    <ChartDownload>
      <Line
        ref="line"
        :options="chartOptions"
        :data="{
          labels: semester.map((s) => s.semester.substring(4)),
          datasets: [
            {
              label: 'Insgesamt',
              data: semester.map((s) => s.data.totalBeginner || 0),
              backgroundColor: BACKGROUND_COLORS[7],
              borderColor: BORDER_COLORS[7]
            },
            {
              label: categoryMap.femaleBeginner,
              data: semester.map((s) => s.data.femaleBeginner || 0),
              backgroundColor: BACKGROUND_COLORS[6],
              borderColor: BORDER_COLORS[6]
            },
            {
              label: categoryMap.maleBeginner,
              data: semester.map((s) => s.data.maleBeginner || 0),
              backgroundColor: BACKGROUND_COLORS[0],
              borderColor: BORDER_COLORS[0]
            },
            {
              label: categoryMap.diverseBeginner,
              data: semester.map((s) => s.data.diverseBeginner || 0),
              backgroundColor: BACKGROUND_COLORS[2],
              borderColor: BORDER_COLORS[2]
            }
          ]
        }"
      />
    </ChartDownload>
  </div>
</template>

<style scoped></style>
