<template>
    <div class="signup-confirm-component b-center absolute">
        <div class="column items-stretch">
            <div class="column items-center">
                <h1>Confirm Email</h1>
                <QAvatar size="100px">
                    <div style="width:100%;height:0;padding-bottom:113%;position:relative;"><iframe
                            src="https://giphy.com/embed/l4SVvgWOQwhloy6US2" width="100%" height="100%"
                            style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                </QAvatar>
            </div>
            <div class="column items-center">
                <span class="description">We sent a code to your email. Please enter it below.</span>
                <InputOTP v-model="otp"></InputOTP>
            </div>
            <PrimaryButton @click="handleClickConfirm">Confirm</PrimaryButton>
            <PrimaryButton @click="handleClickResend" color="transparent" :disable="!canResent">
                <span style="text-decoration: underline; font-size: 14px;">{{ resentMessage }}</span>
            </PrimaryButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputOTP from '../../components/inputs/InputOTP.vue';
import { QAvatar } from 'quasar';
import { ref } from 'vue';
import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
import { computed } from 'vue';
import { onMounted } from 'vue';

const otp = ref('');
const waitResentSecond = ref(60);

const canResent = computed(() => waitResentSecond.value <= 0);
const resentMessage = computed(() => {
    if (!canResent.value) {
        return `Not received? Wait ${waitResentSecond.value} seconds`;
    }
    return 'Resend';
})

const handleClickConfirm = () => {
    console.log({ otp: otp.value });
}
const handleClickResend = () => {

}
const handleClickChangeEmail = () => {

}

onMounted(() => {
    setInterval(() => {
        if (waitResentSecond.value > 0) {
            waitResentSecond.value--;
        }
    }, 1000);
})
</script>

<style>
.signup-confirm-component {
    & .description {
        font-size: 18px;
        margin: 0.5em;
    }
}
</style>