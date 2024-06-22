<script setup lang="ts">
import { getCurrentInstance, inject, onMounted, ref } from 'vue';
import { HIDE_BUTTONS } from '@/symbols';
import { useToast } from 'vuestic-ui';

const instance = getCurrentInstance();

withDefaults(
  defineProps<{
    hideButtons?: boolean;
  }>(),
  { hideButtons: false }
);

const { init } = useToast();

const hideButtonsInj = inject(HIDE_BUTTONS, false);

const canvas = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  // @ts-ignore
  canvas.value = instance?.subTree?.children?.[0]?.children?.[0]?.el;
});
function download(e: Event) {
  if (!canvas.value || !e.currentTarget) {
    return;
  }
  init({
    color: 'success',
    title: 'Grafik heruntergeladen!',
    message: 'Die Grafik wurde erfolgreich exportiert!'
  });
  (e.currentTarget as HTMLAnchorElement).href =
    canvas.value.toDataURL('image/png');
}
function copy() {
  if (!canvas.value) {
    return;
  }
  canvas.value.toBlob(
    async (b) =>
      b &&
      (await navigator.clipboard
        .write([
          new ClipboardItem({
            'image/png': b
          })
        ])
        .then(() =>
          init({
            color: 'success',
            title: 'Grafik kopiert!',
            message:
              'Die Grafik wurde erfolgreich in die Zwischenablage kopiert!'
          })
        ))
  );
}
</script>

<template>
  <slot />
  <VaButtonGroup
    preset="secondary"
    border-color="#000000"
    :disabled="!canvas"
    color="#000000"
    v-if="!(hideButtons || hideButtonsInj)"
  >
    <VaButton
      icon="download"
      @click="download"
      download="ChartImage.png"
      title="Als Bild herunterladen"
      tag="a"
    />
    <VaButton
      icon="content_copy"
      title="In Zwischenablage kopieren"
      @click="copy"
    />
  </VaButtonGroup>
</template>

<style scoped></style>
