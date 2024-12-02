<script setup lang="ts">
interface BlackAndWhiteBgProps {
    axe: 'x' | 'y',
    whiteSize: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5',
    blackSize: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5',
    whiteFirst?: boolean,
}

defineProps<BlackAndWhiteBgProps>();
</script>

<template>
    <div
        :class="[axe === 'x' ? `flex-row${whiteFirst ? '-reverse' : ''}` : `flex-col${whiteFirst ? '-reverse' : ''}`]"
        class="absolute -z-10 w-full h-full flex"
    >
        <div
            :class="[
                axe === 'y' ? 'w-full' : `w-${blackSize}`,
                axe === 'y' ? `h-${blackSize}` : 'h-full'
            ]"
            class="bg-carbon"
        ></div>
        <div
            :class="[
                axe === 'y' ? 'w-full' : `w-${whiteSize}`,
                axe === 'y' ? `h-${whiteSize}` : 'h-full'
            ]"
            class="bg-white"
        ></div>
    </div>
</template>
