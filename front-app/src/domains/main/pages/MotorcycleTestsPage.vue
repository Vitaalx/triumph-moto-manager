<script setup lang="ts">
import { ref } from "vue";
import TestStepper from "../components/TestStepper.vue";
import MotorcycleCard from "../components/MotorcycleCard.vue";

const motorcycles = [
	{
		image: "https://picsum.photos/400/300",
		name: "Triumph Street Triple RS",
		description: `La Street Triple RS est la moto la plus explosive de la gamme Street Triple.
		Avec son moteur 765 cm3, elle offre une puissance de 123 ch et un couple de 79 Nm.`
	},
	{
		image: "https://picsum.photos/400/300",
		name: "Triumph Tiger 900 Rally Pro",
		description: `La Tiger 900 Rally Pro est une moto d'aventure qui offre une puissance de 95 ch et un couple de 87 Nm.
		Elle est équipée de suspensions Showa et d'un écran TFT de 7 pouces.`
	},
	{
		image: "https://picsum.photos/400/300",
		name: "Triumph Rocket 3 R",
		description: `La Rocket 3 R est une moto de cruiser qui offre une puissance de 167 ch et un couple de 221 Nm.
		Elle est équipée de suspensions Showa et d'un écran TFT de 7 pouces.`
	},
	{
		image: "https://picsum.photos/400/300",
		name: "Triumph Bonneville T120",
		description: `La Bonneville T120 est une moto de cruiser qui offre une puissance de 80 ch et un couple de 105 Nm.
		Elle est équipée de suspensions Showa et d'un écran TFT de 7 pouces.`
	},
	{
		image: "https://picsum.photos/400/300",
		name: "Triumph Speed Twin",
		description: `La Speed Twin est une moto de cruiser qui offre une puissance de 100 ch et un couple de 112 Nm.
		Elle est équipée de suspensions Showa et d'un écran TFT de 7 pouces.`
	}
];

const currentStep = ref(1);

const handleStepChange = (step: number) => {
	currentStep.value = step;
	console.log("Current step:", currentStep.value);
};
</script>

<template>
	<section class="my-14">
		<div class="container flex flex-col gap-12 items-center">
			<h1 class="text-xl md:text-2xl font-bold text-center relative after:content-[''] after:block after:h-0.5 after:bg-primary after:mt-3">
				Réservez un essai
			</h1>

			<TestStepper
				:step="currentStep"
				@update:step="handleStepChange"
			/>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<MotorcycleCard
					v-for="(motorcycle, index) in motorcycles"
					:key="index"
					:image="motorcycle.image"
					:name="motorcycle.name"
					:description="motorcycle.description"
				/>
			</div>
		</div>
	</section>
</template>
