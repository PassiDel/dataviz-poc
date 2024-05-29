<script setup lang="ts">
import { faculties } from '@/data';

const { hideDegrees, right } = withDefaults(
  defineProps<{
    hideDegrees?: boolean;
    right?: boolean;
  }>(),
  {
    hideDegrees: false,
    right: false
  }
);

const selected = defineModel('selected', { default: 0 });
</script>

<template>
  <div
    class="flex h-full flex-col gap-7 overflow-y-auto"
    :class="{ 'text-right': right }"
  >
    <div v-for="(faculty, i) in faculties" :key="`f-${i}`">
      <VaAffix :offset-top="130">
        <a
          href="#"
          v-if="hideDegrees"
          @click.prevent="() => (selected = faculty.number)"
        >
          <h3
            class="font-bold"
            :class="{ underline: selected === faculty.number }"
          >
            {{ faculty.name }}
          </h3></a
        >
        <h3 v-else class="bg-backgroundPrimary font-bold">
          {{ faculty.name }}
        </h3>
      </VaAffix>

      <div v-if="!hideDegrees" class="flex flex-col">
        <div v-for="(degree, j) in faculty.degrees" :key="`d-${i}-${j}`">
          <a
            href="#"
            v-if="!hideDegrees"
            @click.prevent="() => (selected = degree.number)"
          >
            <h4
              :class="{
                underline: selected === degree.number,
                'pl-2': !right,
                'pr-3': right
              }"
            >
              {{ degree.name }}
            </h4></a
          >
          <h4 v-else class="pl-2">{{ degree.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
