<template>
    <VOtpInput v-model:value="model" separator=" " :num-inputs="4" input-classes="otp-input"></VOtpInput>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VOtpInput from 'vue3-otp-input';

export type InputOTPProps = {
    modelValue: string,
    "onUpdate:modelValue": (value: string) => void,
}
const props = withDefaults(defineProps<InputOTPProps>(), {
    modelValue: '',
    "onUpdate:modelValue": (value: string) => { },
})

const model = computed({
    get: () => props.modelValue,
    set: (value) => props['onUpdate:modelValue'](value),
})
</script>

<style>
.input-otp {
    & .title {
        font-size: 18px;
    }
}

.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
}
</style>
