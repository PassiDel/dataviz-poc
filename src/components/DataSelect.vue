<script setup lang="ts">
import { degreeIcon, faculties } from '@/data';

const props = withDefaults(
  defineProps<{
    right?: boolean;
    selectedFaculty?: number;
  }>(),
  {
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
    <VaAccordion stateful>
      <VaCollapse v-for="(faculty, i) in faculties" :key="`f-${i}`">
        <template #header-content>
          <a href="#" @click.prevent="() => (selected = faculty.number)">
            <h3
              class="font-bold hover:underline"
              :class="{
                underline: selected === faculty.number,
                italic: selectedFaculty === faculty.number
              }"
            >
              {{ faculty.name }}
            </h3></a
          ></template
        ><template #content>
          <div class="flex flex-col">
            <div v-for="(degree, j) in faculty.degrees" :key="`d-${i}-${j}`">
              <a href="#" @click.prevent="() => (selected = degree.number)">
                <h4
                  class="hover:underline"
                  :class="{
                    underline: selected === degree.number,
                    'pl-2': !right,
                    'pr-3': right
                  }"
                >
                  <VaIcon v-if="!right" :name="degreeIcon(degree)" />
                  {{ degree.name }}
                  <VaIcon v-if="right" :name="degreeIcon(degree)" /></h4
              ></a>
            </div>
          </div>
        </template>
      </VaCollapse>
    </VaAccordion>
  </div>
</template>

<style scoped></style>
