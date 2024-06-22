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
      <VaCollapse>
        <template #header="{ attributes }">
          <div
            v-bind="attributes"
            class="va-collapse__header"
            :class="selected === -1 ? 'test' : undefined"
            @click="() => (selected = -1)"
          >
            <a href="#" @click.prevent="() => (selected = -1)">
              <h3
                class="text-xl font-bold hover:underline"
                :class="{
                  underline: selected === -1,
                  italic: selectedFaculty === -1
                }"
              >
                HSB
              </h3></a
            >
          </div>
        </template>
      </VaCollapse>
      <VaCollapse v-for="(faculty, i) in faculties" :key="`f-${i}`">
        <template #header="{ value, attributes }">
          <div
            v-bind="attributes"
            class="va-collapse__header"
            :class="
              selectedFaculty === faculty.number || selected === faculty.number
                ? 'test'
                : undefined
            "
          >
            <a href="#" @click.prevent="() => (selected = faculty.number)">
              <h3
                class="font-bold hover:underline"
                :class="{
                  'italic underline': selected === faculty.number
                }"
              >
                {{ faculty.name }}
              </h3></a
            >
            <va-icon
              class="va-collapse__expand-icon"
              name="va-arrow-down"
              :class="
                value
                  ? 'va-collapse__expand-icon--expanded'
                  : 'va-collapse__expand-icon--collapsed'
              "
            />
          </div>
        </template>
        <template #header-content> </template
        ><template #content>
          <div class="flex flex-col">
            <div v-for="(degree, j) in faculty.degrees" :key="`d-${i}-${j}`">
              <a href="#" @click.prevent="() => (selected = degree.number)">
                <h4
                  class="hover:underline"
                  :class="{
                    'font-bold': selected === degree.number,
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

<style scoped>
.test {
  @apply text-white;
  background: linear-gradient(to right, rgb(10, 85, 140), rgb(50, 180, 200));
}

.va-collapse__header {
  @apply hover:bg-gray-200;
}
</style>
