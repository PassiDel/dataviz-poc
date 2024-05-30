<script setup lang="ts">
import type { DegreeData } from '@/data';
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

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const { degree } = defineProps<{
  degree: DegreeData;
}>();

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      labels: {
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
            context.formattedValue
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
      text: 'Geschlechterverteilung nach Herkunft'
    }
  }
} satisfies ChartOptions<'pie'>);
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
          'NB',

          'NB',
          'Männlich',
          'Weiblich'
        ],
        datasets:
          degree.semester.length > 0
            ? [
                {
                  data: [
                    degree.semester[0].data.totalGerman,
                    degree.semester[0].data.totalForeign
                  ].map((v) => v || 0),
                  backgroundColor: ['black', 'white']
                },
                {
                  data: [
                    degree.semester[0].data.femaleGerman,
                    degree.semester[0].data.maleGerman,
                    degree.semester[0].data.diverseGerman,

                    degree.semester[0].data.diverseForeign,
                    degree.semester[0].data.maleForeign,
                    degree.semester[0].data.femaleForeign
                  ].map((v) => v || 0),
                  backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'green',
                    'blue',
                    'red'
                  ]
                }
              ]
            : []
      }"
  /></ChartDownload>
</template>

<style scoped></style>
