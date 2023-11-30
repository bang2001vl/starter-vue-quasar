<template>
    <div class="layout-center-screen">
        <QImg class="background" fit="cover" src="../assets/bg_black.jpeg"></QImg>
        <div class="content-container b-center fixed">
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { QImg } from "quasar";
</script>
  
<style>
.content-container {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    padding: 20px 30px;
    width: 90%;
    max-width: 600px;
    min-width: 250px;
    font-size: 18px;

    &>.column>* {
        margin-bottom: 15px;
    }
}

h1 {
    font-size: 30px;
    line-height: 2em;
    margin: 0px;
}
</style>
  