<script setup lang="ts">
import { mdiMotorbike, mdiStore, mdiSend } from '@mdi/js';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import { TheStepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import TheIcon from '@/components/TheIcon.vue';

interface Props {
  step: number;
}

defineProps<Props>();

const steps = [
  {
    step: 1,
    title: 'Modèle',
    description: 'Choisissez votre modèle de moto',
    icon: mdiMotorbike,
  },
  {
    step: 2,
    title: 'Concessionnaire',
    description: 'Choisissez votre concessionnaire',
    icon: mdiStore,
  },
  {
    step: 3,
    title: 'Envoyer',
    description: 'Envoyez votre demande',
    icon: mdiSend,
  },
]

const emits = defineEmits<{
	"update:step": [number];
}>();

function updateStep(step: number) {
  emits('update:step', step);
}
</script>

<template>
  <TheStepper class="flex w-full items-start gap-2">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full flex-col items-center justify-center"
      :step="step.step"
    >
      <StepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />

      <StepperTrigger as-child>
        <ButtonPrimary
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          size="icon"
          class="z-10 rounded-full shrink-0"
          :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          @click="updateStep(step.step)"
        >
        <TheIcon :icon="step.icon" />
        </ButtonPrimary>
      </StepperTrigger>

      <div class="mt-5 flex flex-col items-center text-center">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </StepperTitle>
        <StepperDescription
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </TheStepper>
</template>
