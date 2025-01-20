<script setup lang="ts">
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { h } from "vue";
import AdminSection from "../components/AdminSection.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { TheInput } from "@/components/ui/input";
import { TheButton } from "@/components/ui/button";

const formSchema = toTypedSchema(
	z.object({
		brand: z
			.string({ message: "La marque est obligatoire." })
			.min(2, { message: "La marque doit contenir au moins 2 caractères." })
			.max(50, { message: "La marque ne doit pas dépasser 50 caractères." }),
		model: z
			.string({ message: "Le modèle est obligatoire." })
			.min(2, { message: "Le modèle doit contenir au moins 2 caractères." })
			.max(50, { message: "Le modèle ne doit pas dépasser 50 caractères." }),
		licensePlate: z
			.string({ message: "L'immatriculation est obligatoire." })
			.regex(
				/^[A-HJ-NP-Z]{2}-\d{3}-[A-HJ-NP-Z]{2}$/,
				{ message: "L'immatriculation doit être au format AA-123-BB." }
			)
			.min(5, { message: "L'immatriculation doit contenir au moins 5 caractères." })
			.max(10, { message: "L'immatriculation ne doit pas dépasser 10 caractères." }),
		year: z
			.number({ message: "L'année est obligatoire." })
			.int({ message: "L'année doit être un nombre entier." })
			.min(1900, { message: "L'année doit être supérieure ou égale à 1900." })
			.max(new Date().getFullYear(), { message: "L'année ne peut pas être dans le futur." }),
		price: z
			.number({ message: "Le prix est obligatoire." })
			.min(0, { message: "Le prix doit être supérieur ou égal à 0." })
			.max(1000000, { message: "Le prix doit être inférieur ou égal à 1 000 000." }),
		maintenanceInterval: z
			.string({ message: "L'intervalle de maintenance est obligatoire." })
			.regex(/^\d+\s?(km|KM|Km)$/, { message: "L'intervalle de maintenance doit être au format 'X km'." })
			.min(3, { message: "L'intervalle de maintenance doit être valide." }),
	})
);


const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	console.log(values);

	try {
		await api.post("/api/motorcycle", values);

		toast({
			title: "Moto ajoutée",
			description: h("pre",
				{ class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
				h("code", { class: "text-white" }, JSON.stringify(values, null, 2))),
		});
	} catch (error) {
		console.error(error);
	}
});
</script>

<template>
	<AdminSection title="Ajouter une moto">
		<form
			class="space-y-6"
			@submit="onSubmit"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="brand"
				>
					<FormItem>
						<FormLabel>Marque</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Yamaha"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="model"
				>
					<FormItem>
						<FormLabel>Modèle</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="MT-07"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="licensePlate"
			>
				<FormItem>
					<FormLabel>Immatriculation</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="AA-123-BB"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="year"
				>
					<FormItem>
						<FormLabel>Année</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="2020"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="price"
				>
					<FormItem>
						<FormLabel>Prix</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="7500"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="maintenanceInterval"
			>
				<FormItem>
					<FormLabel>Intervalle de maintenance</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="6000 km"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="flex justify-end">
				<TheButton type="submit">
					Ajouter
				</TheButton>
			</div>
		</form>
	</AdminSection>
</template>
  
