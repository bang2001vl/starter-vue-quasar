<template>
    <LayoutCenterScreen>
        <div class="column items-stretch">
            <div class="row justify-center">
                <h1>Sign Up</h1>
            </div>
            <InputCommon title="Email" v-model="email.value" :fn-validate="() => email.validate()"></InputCommon>
            <InputPassword title="Password" v-model="password.value" :fn-validate="() => password.validate()">
            </InputPassword>
            <InputCommon title="Display Name" v-model="displayName.value" :fn-validate="() => displayName.validate()">
            </InputCommon>
            <RadioSelect title="Gender" v-model="gender" :listValues="genderList"></RadioSelect>
            <PrimaryButton @click="handleClickSignUp">
                <span style="font-size: 18px;">Sign Up</span>
            </PrimaryButton>
            <PrimaryButton @click="handleClickLogin" color="transparent">
                <span style="text-decoration: underline; font-size: 14px;">Already have an account?</span>
            </PrimaryButton>
        </div>
    </LayoutCenterScreen>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import InputCommon from '@/components/inputs/InputCommon.vue';
import LayoutCenterScreen from '@/layouts/LayoutCenterScreen.vue';
import { InputData } from '@/components/_shared/input.rule';
import InputPassword from '@/components/inputs/InputPassword.vue';
import RadioSelect from '@/components/inputs/RadioSelect.vue';
import { ref } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import DialogOtpConfirm, { type DialogOtpConfirmProps } from '@/components/dialogs/DialogOtpConfirm.vue';
const $router = useRouter();
const $q = useQuasar();

const email = reactive(new InputData<string>());
const password = reactive(new InputData<string>());
const displayName = reactive(new InputData<string>());

const genderList = ['Male', 'Female'];
const gender = ref(genderList[0]);

const otp = ref('');

const handleClickLogin = () => {
    $router.push({ name: 'login' });
}
const handleClickSignUp = () => {
    console.log({ email: email.value, password: password.value, displayName: displayName.value, gender: gender.value, otp });
    openDialogGetOtp();
}

const handleSentOtp = async () => {
    console.log('On handleSentOtp');
    console.log({ email: email.value, password: password.value, displayName: displayName.value, gender: gender.value, otp });
    return {
        sentTime: new Date(),
    }
}

const openDialogGetOtp = () => {
    $q.dialog({
        component: DialogOtpConfirm,
        componentProps: {
            title: 'Confirm email',
            description: `We sent a code to email "${email.value}". Please enter it below.`,
            fnResent: handleSentOtp,
            resentWaitSecond: 60,
            resentWaitStartTime: new Date(),
        } as DialogOtpConfirmProps,
    }).onOk((payload: any) => {
        console.log('[DialogOtpConfirm] On ok', { otp: payload.otp });
    }).onCancel(() => {
        console.log('[DialogOtpConfirm] On cancel');
    }).onDismiss(() => {
        console.log('[DialogOtpConfirm] On dismiss');
    })
}
</script>