<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- use a dynamic transition name -->
  <RouterView v-slot="{ Component, route }">
    <transition :name="`${route.meta.transition || 'fade'}`">
      <component :is="Component"></component>
    </transition>
  </RouterView>
</template>

<style>
/* Style for entire app */
.background {
  /* Full height */
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -10;

  /* Center and scale the image nicely */
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}

.fixed-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.b-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &.absolute {
    position: absolute;
  }

  &.fixed {
    position: fixed;
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
