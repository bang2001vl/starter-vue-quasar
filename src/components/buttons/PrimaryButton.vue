
<template>
    <QBtn v-bind="{ ...commonButtonStyle, ...ownProps, ...$props }">
        <slot></slot>
    </QBtn>
</template>
  
<script setup lang="ts">
import { QBtn } from 'quasar';
import { commonButtonStyle } from '../_shared/button.style';
import type { QBtnProps } from 'quasar';

// Disable all un-decleared props
defineOptions({ inheritAttrs: false });

type AllowCustomProps = Pick<QBtnProps, 'onClick' | 'color' | 'textColor' | 'disable' | 'loading'>;
withDefaults(defineProps<AllowCustomProps>(), {
    color: 'primary',
    textColor: undefined,
    disable: false,
    loading: false,
});

const ownProps: QBtnProps = {
    color: "primary",
}
</script>

<style></style>