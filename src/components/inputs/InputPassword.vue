<template>
  <InputCommon v-bind="{ ...$attrs, ...$props }" :type="isVisible ? 'text' : 'password'">
    <template v-slot:append>
      <QBtn @click="toggleVisible" dense round>
        <QIcon :name="isVisible ? 'visibility_off' : 'visibility'"></QIcon>
      </QBtn>
    </template>
  </InputCommon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QBtn, QIcon } from "quasar";
import InputCommon from "./InputCommon.vue";

const InputPassword = defineComponent({
  components: {
    QBtn,
    QIcon,
    InputCommon,
  },
  data(vm) {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.isVisible = !this.isVisible;
    },
  },
})

export default InputPassword as (typeof InputPassword & typeof InputCommon);
</script>
