<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { ref } from 'vue';

ChartJS.register(
  Title,
  Colors,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

defineProps<{
  msg: string;
}>();

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }, { data: [90, 30, 32] }]
});

const chartOptions = ref({
  responsive: true
});
</script>

<template>
  <div class="">
    <h1
      class="m-3 rounded-3xl bg-red-700 p-4 text-3xl transition hover:bg-green-700"
    >
      {{ msg }}
    </h1>
    <VaButton color="warning" icon="self_improvement" class="mx-10"
      >Click me</VaButton
    >
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped></style>
