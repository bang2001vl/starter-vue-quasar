<template>
    <QDialog class="dialog-otp-confirm" ref="dialogRef" @hide="onDialogHide" transition-show="scale"
        transition-hide="jump-up">
        <QCard class="q-dialog-plugin">
            <div class="main-col column items-stretch">
                <div class="column items-center">
                    <h1 v-if="typeof title === 'string' && title.length > 0">{{ title }}</h1>
                    <QAvatar size="100px">
                        <div style="width:100%;height:0;padding-bottom:113%;position:relative;"><iframe
                                src="https://giphy.com/embed/l4SVvgWOQwhloy6US2" width="100%" height="100%"
                                style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        </div>
                    </QAvatar>
                </div>
                <div class="column items-center">
                    <span class="description">{{ description }}</span>
                    <InputOTP v-model="otp"></InputOTP>
                </div>
                <PrimaryButton @click="handleClickConfirm">Confirm</PrimaryButton>
                <PrimaryButton @click="handleClickResend" color="transparent" :disable="!canResent">
                    <span style="text-decoration: underline; font-size: 14px;">{{ resentMessage }}</span>
                </PrimaryButton>
            </div>
        </QCard>
    </QDialog>
</template>

<script setup lang="ts">
import InputOTP from '../../components/inputs/InputOTP.vue';
import { QAvatar, QDialog, QCard, useDialogPluginComponent } from 'quasar';
import { onBeforeUnmount, ref } from 'vue';
import PrimaryButton from '../../components/buttons/PrimaryButton.vue';
import { computed } from 'vue';
import { onMounted } from 'vue';

export type DialogOtpConfirmProps = {
    resentWaitSecond: number, // Required
    fnResent: () => Promise<{ sentTime: Date }>, // Required
    title?: string, // Hide when undefined. Default is undefined
    description?: string, // Default is 'Please enter OTP code below.'
    resentWaitStartTime?: Date, // Default is current time
}
const props = withDefaults(defineProps<DialogOtpConfirmProps>(), {
    description: 'Please enter OTP code below.',
    resentWaitStartTime: () => new Date(),
});

export type DialogOtpConfirmEmits = {
    ok: [otp: string],
    hide: [],
}
const emit = defineEmits<DialogOtpConfirmEmits>();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const otp = ref('');
const waitResentStartTime = ref(props.resentWaitStartTime || new Date());
const waitResentCurrentTime = ref(new Date());
let waitResentTimerId: any;
const startTimer = () => {
    // Prevent duplicated
    clearInterval(waitResentTimerId);
    waitResentCurrentTime.value = new Date();
    waitResentTimerId = setInterval(() => {
        waitResentCurrentTime.value = new Date();
        // Log to debug
        console.log('On Tick', { canResent: canResent.value, waitResentCurrentTime: waitResentCurrentTime.value });
        if (canResent.value) {
            clearInterval(waitResentTimerId);
            waitResentTimerId = undefined;
        }
    }, 1000);
}

const spentSeconds = computed(() => Math.floor((waitResentCurrentTime.value.getTime() - waitResentStartTime.value.getTime()) / 1000));
const canResent = computed(() => spentSeconds.value >= props.resentWaitSecond);
const resentMessage = computed(() => {
    if (!canResent.value) {
        return `Not received? Wait ${props.resentWaitSecond - spentSeconds.value} seconds`;
    }
    return 'Resend';
})

const handleClickConfirm = () => {
    console.log({ otp: otp.value });
    onDialogOK({ otp: otp.value });
}
const handleClickResend = async () => {
    const result = await props.fnResent();
    waitResentStartTime.value = result.sentTime;
    startTimer();
}
const handleClickBack = () => {
    onDialogCancel();
}

onMounted(() => {
    startTimer();
});
// Clean up the interval on component unmount
onBeforeUnmount(() => {
    clearInterval(waitResentTimerId);
});

</script>

<style>
.dialog-otp-confirm {
    font-size: 18px;

    & .main-col {
        padding: 1em 2em;

        &>* {
            margin-bottom: 1em;
        }
    }

    & .description {
        font-size: 18px;
        margin: 0.5em;
    }
}
</style>