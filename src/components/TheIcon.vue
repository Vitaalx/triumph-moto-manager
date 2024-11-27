<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';

interface Icon {
    path: string
    size?: string
}

defineProps<Icon>()
</script>

<template>
    <SvgIcon type="mdi" :path="path" :size="size" />
</template>
