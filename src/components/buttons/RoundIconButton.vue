
<template>
    <QBtn v-bind="{ ...commonButtonStyle, ...$props }" round>
        <slot></slot>
    </QBtn>
</template>
  
<script setup lang="ts">
import { QBtn, QIcon } from 'quasar';
import { commonButtonStyle } from '../_shared/button.style';
import type { QBtnProps } from 'quasar';

// Disable all un-decleared props
defineOptions({ inheritAttrs: false });

type AllowCustomProps = Pick<QBtnProps, 'onClick' | 'color' | 'textColor' | 'disable' | 'loading' | 'icon'>;
withDefaults(defineProps<AllowCustomProps>(), {
    color: 'primary',
    textColor: undefined,
    disable: false,
    loading: false,
    icon: 'my_location',
});
</script>

<style></style>