<script setup lang="ts">
import { type DegreeData, LATEST_YEAR, type Semester } from '@/data';
import { Pie } from 'vue-chartjs';
import {
  ArcElement,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { ref } from 'vue';
import ChartDownload from '@/components/ChartDownload.vue';
import { BORDER_COLORS } from '@/utils/HSBColors';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
defineProps<{
  degree: DegreeData;
  year?: Semester;
}>();

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        color: 'black',
        font: {
          size: 15
        },
        generateLabels: function (chart) {
          // Get the default label list
          const original =
            ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
          const labelsOriginal = original.call(this, chart);

          // Build an array of colors used in the datasets of the chart
          const datasetColors: string[] = chart.data.datasets
            .map(function (e) {
              return e.backgroundColor;
            })
            .flat() as any;

          // Modify the color and hide state of each label
          labelsOriginal.forEach((label) => {
            // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
            label.datasetIndex = label.index!! > 1 ? 1 : 0;

            // The hidden state must match the dataset's hidden state
            label.hidden = !chart.isDatasetVisible(label.datasetIndex);

            // Change the color to match the dataset
            label.fillStyle = datasetColors[label.index || 0];
          });

          return labelsOriginal.filter(
            (l) => l.datasetIndex === 0 || (l.index || 0) % 2 === 0
          );
        }
      },
      onClick: function (_, legendItem, legend) {
        // toggle the visibility of the dataset from what it currently is
        legend.chart.getDatasetMeta(legendItem.datasetIndex || 0).hidden =
          legend.chart.isDatasetVisible(legendItem.datasetIndex || 0);
        legend.chart.update();
      }
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const labelIndex = context.datasetIndex * 2 + context.dataIndex;
          return (
            context.chart.data.labels?.[labelIndex] +
            ': ' +
            (context.raw as number).toLocaleString('de')
          );
        },
        title: function (context): string {
          if (context[0].datasetIndex === 0) {
            return context[0].chart.data.labels?.[context[0].dataIndex] as any;
          }
          return context[0].dataIndex > 2 ? 'Ausländisch' : 'Deutsch';
        }
      }
    },
    title: {
      display: true,
      text: 'Geschlechterverteilung nach Herkunft',
      padding: {
        top: 20,
        bottom: 10
      },
      font: {
        size: 20
      },
      color: 'black'
    }
  }
} satisfies ChartOptions<'pie'>);

function dataset(d: DegreeData, y: Semester = LATEST_YEAR) {
  const semester = d.semester.find((s) => s.semester === y);
  if (!semester) {
    return [];
  }
  return [
    {
      data: [semester.data.totalGerman, semester.data.totalForeign].map(
        (v) => v || 0
      ),
      backgroundColor: ['black', 'white']
    },
    {
      data: [
        semester.data.femaleGerman,
        semester.data.maleGerman,
        semester.data.diverseGerman,

        semester.data.diverseForeign,
        semester.data.maleForeign,
        semester.data.femaleForeign
      ].map((v) => v || 0),
      backgroundColor: [
        BORDER_COLORS[6],
        BORDER_COLORS[0],
        BORDER_COLORS[2],
        BORDER_COLORS[2],
        BORDER_COLORS[0],
        BORDER_COLORS[6]
      ]
    }
  ];
}
</script>

<template>
  <ChartDownload>
    <Pie
      :options="chartOptions"
      :data="{
        labels: [
          'Deutsch',
          'Ausländisch',

          'Weiblich',
          'Männlich',
          'Divers',

          'Divers',
          'Männlich',
          'Weiblich'
        ],
        datasets: dataset(degree, year)
      }"
  /></ChartDownload>
</template>

<style scoped></style>
