<script setup lang="ts">
defineProps<{
  msg: string;
}>();
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
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped></style>
