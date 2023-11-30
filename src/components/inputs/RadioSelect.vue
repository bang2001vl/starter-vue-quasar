<template>
    <div class="radio-select column">
        <span class="title">{{ title }}</span>
        <div class="row">
            <QRadio v-for="value, index of listValues" :key="index" :label="fnGetLabel(value)" :val="value" v-model="model">
            </QRadio>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QRadio } from 'quasar';
import { computed } from 'vue';

type ModelValueType = string;
export type RadioSelectProps = {
    title: string,
    listValues: ModelValueType[],
    modelValue: ModelValueType,
    fnGetLabel?: (value: ModelValueType) => string,
}
const props = withDefaults(defineProps<RadioSelectProps>(), {
    listValues: () => [],
    fnGetLabel: (value: ModelValueType) => `${value}`,
    title: 'Title',
})

export type RadioSelectEmits = {
    'update:modelValue': [value: ModelValueType],
}
const emit = defineEmits<RadioSelectEmits>();

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>

<style>
.radio-select {
    & .title {
        font-size: 18px;
    }
}
</style>