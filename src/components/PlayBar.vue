<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import type { Semester } from '@/data';

const props = defineProps<{
  years: Semester[];
}>();

let interval = ref(-1);
const selected = defineModel<Semester>();
const running = computed({
  get() {
    return interval.value > -1;
  },
  set(newValue) {
    if (newValue) {
      selected.value = props.years[0];
      interval.value = setInterval(() => {
        const currentIndex = props.years.indexOf(selected.value || 'WiSe1000');
        if (currentIndex >= props.years.length - 1) {
          selected.value = props.years[0];
          return;
        }

        selected.value = props.years[currentIndex + 1];
      }, 1500);
    } else {
      clearInterval(interval.value);
      interval.value = -1;
    }
  }
});
onUnmounted(() => clearInterval(interval.value));
</script>

<template>
  <div
    class="fixed bottom-3 left-0 right-0 mx-auto w-3/6 rounded-2xl bg-gray-400 p-3 text-white"
  >
    <VaSlider
      :model-value="Math.max(years.indexOf(selected || 'WiSe1000'), 0)"
      @update:modelValue="(newValue) => (selected = years[newValue])"
      :max="years.length - 1"
      track-label-visible
      pins
      :track-label="(v) => years[v]"
    >
      <template #label>
        <VaButton
          :icon="running ? 'pause' : 'play_arrow'"
          :title="running ? 'Pausieren' : 'Abspielen'"
          class="mr-4"
          @click="() => (running = !running)"
      /></template>
      <template #prepend>
        <VaChip color="warning" size="small">
          {{ years[0] }}
        </VaChip>
      </template>
      <template #append>
        <VaChip color="warning" size="small">
          {{ years[years.length - 1] }}
        </VaChip>
      </template>
    </VaSlider>
  </div>
</template>

<style scoped></style>
