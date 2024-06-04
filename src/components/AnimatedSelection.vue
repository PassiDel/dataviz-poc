<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  options: { name: string; number: number }[];
}>();

const randomOptions = computed(() =>
  // Source: https://stackoverflow.com/a/46545530
  props.options
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
);

const i = ref(0);
let direction = 1;

let interval: number = -1;

onMounted(() =>
  setTimeout(
    () =>
      (interval = setInterval(() => {
        if (i.value <= 0) {
          direction = 1;
        }
        if (i.value >= randomOptions.value.length - 1) {
          direction = -1;
        }
        i.value += direction;
        selected.value = randomOptions.value[i.value].number;
      }, 3000)),
    Math.random() * 1000
  )
);
onUnmounted(() => clearInterval(interval));

const selected = defineModel('selected', { default: 0 });
</script>

<template>
  <div
    class="inline-block h-[1.5em] overflow-hidden border-b-2 border-primary px-4 text-center align-sub leading-[1.5em]"
  >
    <ul
      :style="{ 'margin-top': `-${i * 1.5}em` }"
      class="transition-[margin-top] duration-[2s]"
    >
      <li v-for="option in randomOptions" :key="option.number">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>
