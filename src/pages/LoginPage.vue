<template>
  <LayoutCenterScreen class="page login">
    <div class="column items-stretch">
      <div class="row justify-center">
        <QAvatar style="width: 150px; height: 150px; hor" bordered>
          <div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe
              src="https://giphy.com/embed/4yT8CibjIdIWUsANjZ" width="100%" height="100%" style="position:absolute"
              frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
        </QAvatar>
      </div>
      <div style="text-align: center">
        <h1>{{ $t("login.title") }}</h1>
      </div>
      <InputCommon title="Email" v-model="email.value" :fn-validate="() => email.validate()"></InputCommon>
      <PasswordInput title="Password" v-model="password.value" :fn-validate="() => password.validate()"></PasswordInput>
      <div class="row justify-end">
        <a href="#" style="text-decoration: underline; color: white;">
          <span>Forgot password?</span>
        </a>
      </div>
      <PrimaryButton @click="handleClickLogin">
        <span style="font-size: 18px;">Login</span>
      </PrimaryButton>
      <PrimaryButton @click="handleClickSignup" color="transparent">
        <span style="text-decoration: underline; font-size: 18px;">Create Account</span>
      </PrimaryButton>
    </div>
  </LayoutCenterScreen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCurrentUser } from "../stores/currentUser";
import InputCommon from "../components/inputs/InputCommon.vue";
import { QImg, QAvatar } from "quasar";
import {
  InputData,
  checkError,
  ruleIsEmail,
  ruleIsString,
  ruleStrongPassword,
} from "../components/_shared/input.rule";
import InputPassword from "../components/inputs/InputPassword.vue";
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import LayoutCenterScreen from "../layouts/LayoutCenterScreen.vue";

export default defineComponent({
  components: {
    InputCommon,
    PasswordInput: InputPassword,
    PrimaryButton,
    QAvatar,
    LayoutCenterScreen
  },
  setup(props, ctx) {
    return {
      storeCurrentUser: useCurrentUser(),
    };
  },
  data(vm) {
    return {
      email: new InputData<string>({
        rules: [ruleIsString(), ruleIsEmail()],
      }),
      password: new InputData<string>({
        rules: [ruleIsString(), ruleStrongPassword()],
      }),
    };
  },
  computed: {
    passwordError() {
      return checkError(this.password);
    },
  },
  methods: {
    handleClickLogin() {
      console.log("here");
      console.log({
        email: this.email,
        password: this.password,
      });
    },
    handleClickSignup() {
      this.$router.push({ name: "signup" });
    },
  },
});
</script>
