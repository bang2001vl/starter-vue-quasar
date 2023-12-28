<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
onMounted(() => {
  console.log(`[APP] On mounted`);
  // Run init code for entire app
})
</script>

<template>
  <RouterView />
</template>

<style>
/* Global style here */
</style>
