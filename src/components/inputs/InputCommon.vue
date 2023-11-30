<template>
  <div class="normal-text-input column">
    <span class="title">{{ title }}</span>
    <QInput v-bind="{ ...commonInputStyle, ...$props }" :model-value="modelValue" @update:model-value="updateModel"
      @blur="handleInputBlur" :error="isError" :bottom-slots="isError" :error-message="errorMessage">
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="(name as keyof AllowSlots)" v-bind="slotData || {}"></slot>
      </template>
    </QInput>
  </div>
</template>

<script setup lang="ts">
import { QInput } from "quasar";
import type { QInputProps, QInputSlots } from "quasar";
import { commonInputStyle } from "../_shared/input.style";
import { computed } from "vue";
import { ref } from "vue";

// Prevent implicit modify QInputProps
defineOptions({ inheritAttrs: true });

// Declare property for model
export type InputCommonProps = Pick<
  QInputProps,
  "modelValue" | "name" | 'type'
> & {
  title: string | undefined,
  fnValidate: (value: any) => undefined | string,
};
const props = withDefaults(defineProps<InputCommonProps>(), {
  title: undefined,
  fnValidate: () => undefined,
});

// Declare event update model
type FunctionUpdateModal = NonNullable<QInputProps["onUpdate:modelValue"]>;
export type InputCommonEmits = {
  "update:modelValue": [...args: Parameters<FunctionUpdateModal>],
  "validate:modelValue": [...args: Parameters<FunctionUpdateModal>],
}
const emit = defineEmits<InputCommonEmits>();
const updateModel: FunctionUpdateModal = (value) => {
  emit("update:modelValue", value != null ? value.toString() : null);
  if (isError.value) {
    checkError();
  }
};

const errorMessage = ref(undefined as string | undefined);
const checkError = () => {
  errorMessage.value = props.fnValidate(props.modelValue);
}

const handleInputBlur = () => {
  // Handle the blur event (element lost focus)
  checkError();
};
const isError = computed(
  () => typeof errorMessage.value === "string" && errorMessage.value.length > 0
);

// Declare slots
type AllowSlots = Pick<QInputSlots, 'append'>;
const slots = defineSlots<AllowSlots>();
</script>

<style>
.normal-text-input {
  & .title {
    font-size: 18px;
    line-height: 1.5em;
    margin: 0.3em;
  }
}
</style>