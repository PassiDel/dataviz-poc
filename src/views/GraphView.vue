<script setup lang="ts">
import ChartDownload from '@/components/ChartDownload.vue';
import {
  Chart as ChartJS,
  type ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Scatter } from 'vue-chartjs';
import { computed, nextTick, ref, watch } from 'vue';
import {
  campusMap,
  categoryMap,
  type DegreeData,
  degreeIcon,
  degreeKeyMap,
  degrees,
  faculties,
  type SemesterDataCategories
} from '@/data';
import { useQuery } from '@/composables/useQuery';
import HSBColors from '@/utils/HSBColors';
import DegreeType from '@/components/DegreeType.vue';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  HSBColors,
  Title
);

const highlightOptions = degrees.map(({ semester, ...d }) => ({
  ...d,
  icon: degreeIcon({ ...d, semester })
}));

highlightOptions.sort((a, b) => a.faculty - b.faculty);

type Keys =
  | keyof Omit<DegreeData, 'semester'>
  | `semester.0.data.${SemesterDataCategories}`;

type Groups = keyof Omit<DegreeData, 'semester' | 'short' | 'number' | 'name'>;

const { group, x, y } = useQuery({ group: 'faculty' as Groups, x: 0, y: 2 });

const selectOptions = [
  'faculty',
  'number',
  'semester.0.data.total',
  'semester.0.data.totalGerman',
  'semester.0.data.maleGerman',
  'semester.0.data.femaleGerman',
  'semester.0.data.diverseGerman',
  'semester.0.data.totalForeign',
  'semester.0.data.maleForeign',
  'semester.0.data.femaleForeign',
  'semester.0.data.diverseForeign',
  'semester.0.data.totalPause',
  'semester.0.data.malePause',
  'semester.0.data.femalePause',
  'semester.0.data.diversePause',
  'semester.0.data.totalBeginner',
  'semester.0.data.maleBeginner',
  'semester.0.data.femaleBeginner',
  'semester.0.data.diverseBeginner'
].map((o) => ({ v: o as Keys, icon: keyIcon(o) }));

const keys = computed<{ x: Keys; y: Keys }>(() => ({
  x: selectOptions[x.value]?.v || selectOptions[0].v,
  y: selectOptions[y.value]?.v || selectOptions[2].v
}));

const data = computed<ChartData<'scatter', DegreeData[]>>(() => ({
  datasets: faculties
    .flatMap((f) => f.degrees.map((d) => ({ ...d, _fName: f.name })))
    .reduce<{ label: string; data: DegreeData[] }[]>(
      (datasets, degree) => {
        const key =
          group.value === 'faculty'
            ? degree._fName
            : group.value === 'campus'
              ? campusMap(String(degree[group.value]), false)
              : String(degree[group.value]);
        const g = datasets.find((d) => d.label === key);
        if (!g) {
          datasets.push({
            label: key,
            data: [degree]
          });
          return datasets;
        }
        g.data.push(degree);
        return datasets;
      },
      group.value === 'faculty'
        ? faculties.map((f) => ({ label: f.name, data: [] }))
        : []
    )
}));

const groupOptions = ['faculty', 'fak', 'campus', 'type'].map((o) => ({
  v: o,
  t: degreeKeyMap[o as Groups]
}));

// TODO
const dataOptions = ['Studiengang', 'Fakultät', 'HSB'].map((o) => ({
  v: o,
  t: o
}));

function keyLabel(key: Keys) {
  return key.startsWith('semester.0.data.')
    ? categoryMap[key.substring(16) as SemesterDataCategories]
    : degreeKeyMap[key as keyof typeof degreeKeyMap];
}
function label(degree: DegreeData, key: Keys) {
  const valueString = key.startsWith('semester.0.data.')
    ? degree.semester[0].data[key.substring(16) as SemesterDataCategories]
    : degree[key as keyof DegreeData];

  return `${keyLabel(key)}: ${valueString}`;
}

const highlight = ref<DegreeData[]>([]);

const scatter = ref<{ chart: ChartJS }>();
watch(keys, () => {
  // really rally ugly, but it works
  nextTick(() => scatter.value?.chart.update());
});
watch(highlight, () => {
  // really rally ugly, but it works
  nextTick(() => scatter.value?.chart.update());
});

function keyEmoji(k: string) {
  switch (k.split(' ')[0]) {
    case 'Deutsch':
      return '🇩🇪 ';
    case 'Ausländisch':
      return '🌎 ';
    case 'Urlaub':
      return '🏖️ ';
    case 'StuAnf':
      return '👶 ';
  }

  return '';
}
function keyIcon(k: string) {
  if (k.includes('total')) {
    return 'custom-all';
  }
  if (k.includes('female')) {
    return 'custom-female';
  }
  if (k.includes('male')) {
    return 'custom-male';
  }
  if (k.includes('diverse')) {
    return 'custom-diverse';
  }

  return '';
}
</script>

<template>
  <main class="flex h-full grid-cols-4 flex-col gap-3 p-3 md:grid">
    <div class="flex h-fit flex-col gap-2">
      <VaSelect
        v-model="dataOptions[0].v"
        label="Datensatz"
        :options="dataOptions"
        class="w-full"
        text-by="t"
        value-by="v"
      />
      <VaSelect
        v-model="group"
        label="Gruppierung"
        :options="groupOptions"
        class="w-full"
        text-by="t"
        value-by="v"
      />
      <VaSelect
        v-model="keys.x"
        @update:model-value="
          (k) => (x = selectOptions.findIndex((ko) => ko.v === k))
        "
        label="x-Achse"
        :options="selectOptions"
        class="w-full"
        :text-by="(k: (typeof selectOptions)[0]) => keyLabel(k.v)"
        value-by="v"
        :group-by="
          (k: (typeof selectOptions)[0]) =>
            keyEmoji(keyLabel(k.v)) + keyLabel(k.v).split(' ')[0]
        "
        searchable
      />
      <VaSelect
        v-model="keys.y"
        @update:model-value="
          (k) => (y = selectOptions.findIndex((ko) => ko.v === k))
        "
        label="Y-Achse"
        :options="selectOptions"
        class="w-full"
        :text-by="(k: (typeof selectOptions)[0]) => keyLabel(k.v)"
        value-by="v"
        :group-by="
          (k: (typeof selectOptions)[0]) =>
            keyEmoji(keyLabel(k.v)) + keyLabel(k.v).split(' ')[0]
        "
        searchable
      />
      <VaSelect
        v-model="highlight"
        track-by="number"
        text-by="name"
        :group-by="(k: (typeof highlightOptions)[0]) => `Fakultät ${k.faculty}`"
        label="Hervorheben"
        placeholder="Studiengänge auswählen..."
        :options="highlightOptions"
        clearable
        multiple
        searchable
      >
        <template #content="{ value }">
          <div class="flex flex-wrap">
            <DegreeType
              v-for="chip in value"
              :key="chip"
              :type="chip.type"
              class="m-1"
              ><span class="text-black"> {{ chip.short }}</span>
            </DegreeType>
          </div>
        </template></VaSelect
      >
    </div>
    <div class="overscroll-y-none md:col-span-3">
      <ChartDownload
        ><Scatter
          ref="scatter"
          :data="data as any"
          :options="{
            responsive: true,
            parsing: {
              xAxisKey: keys.x,
              yAxisKey: keys.y
            },
            elements: {
              point: {
                hoverRadius: 15,
                pointStyle(ctx) {
                  const deg =
                    ctx.raw as (typeof data.value.datasets)[0]['data'][0];

                  return (highlight as unknown as DegreeData[])?.some(
                    (h) => h.number === deg.number
                  )
                    ? 'rectRounded'
                    : 'circle';
                },
                radius(ctx) {
                  const deg =
                    ctx.raw as (typeof data.value.datasets)[0]['data'][0];

                  return (highlight as unknown as DegreeData[])?.some(
                    (h) => h.number === deg.number
                  )
                    ? 12
                    : 6;
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: keyLabel(keys.x)
                },
                ticks: {
                  stepSize: keys.x === 'faculty' ? 1 : 0
                }
              },
              y: {
                title: {
                  display: true,
                  text: keyLabel(keys.y)
                },
                ticks: {
                  stepSize: keys.y === 'faculty' ? 1 : 0,
                  callback(tickValue) {
                    return tickValue.toLocaleString('de');
                  }
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const degree = context.raw as DegreeData;
                    if (!degree) {
                      return '';
                    }

                    return [label(degree, keys.x), label(degree, keys.y)];
                  },
                  title: function (context) {
                    const degree = context[0].raw as DegreeData;
                    if (!degree) {
                      return '';
                    }
                    return degree.name;
                  },
                  afterTitle: function (context) {
                    const degree = context[0].raw as DegreeData;
                    if (!degree) {
                      return '';
                    }
                    return [
                      `FK: ${degree.fak}`,
                      `Art: ${degree.type}`,
                      `Campus: ${campusMap(degree.campus)}`
                    ];
                  }
                }
              },
              title: {
                display: true,
                text: 'Alle Studiengänge',
                padding: {
                  top: 20,
                  bottom: 10
                },
                font: {
                  size: 20
                }
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
          }"
      /></ChartDownload>
    </div>
  </main>
</template>

<style scoped></style>
