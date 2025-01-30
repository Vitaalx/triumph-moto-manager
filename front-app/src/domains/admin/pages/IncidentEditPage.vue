<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { z } from "zod";
import { useIncidentEdit } from "../composables/useIncidentEdit";
import AdminSection from "../components/AdminSection.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	TheSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TheTextarea } from "@/components/ui/textarea";
import { TheInput } from "@/components/ui/input";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import { TheCalendar } from "@/components/ui/calendar";
import { ThePopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@lib/utils";
import { DateFormatter, parseDate, type DateValue } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { computed, ref } from "vue";

const params = useRouteParams({
	incidentId: z.string(),
});
const { INCIDENT_LIST } = routerPageName;

const { isLoaded, onSubmit, values, setFieldValue } = useIncidentEdit(params.value.incidentId);

const df = new DateFormatter("fr-FR", {
	dateStyle: "long",
});
const incidentDatePlaceholder = ref<DateValue>();
const incidentDate = computed({
	get: () => values.incidentDate ? parseDate(values.incidentDate) : undefined,
	set: val => val,
});
</script>

<template>
	<AdminSection
		title="Modifier un incident"
		:back-to="INCIDENT_LIST"
	>
		<div v-if="!isLoaded">
			Chargement des données...
		</div>

		<form
			v-else
			@submit="onSubmit"
			class="space-y-6"
		>
			<FormField
				v-slot="{ componentField }"
				name="type"
			>
				<FormItem>
					<FormLabel>Type d'incident</FormLabel>

					<TheSelect v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Sélectionner un type d'incident" />
							</SelectTrigger>
						</FormControl>

						<SelectContent>
							<SelectGroup>
								<SelectItem value="ACCIDENT">
									Accident
								</SelectItem>

								<SelectItem value="INFRACTION">
									Infraction
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</TheSelect>

					<FormMessage />
				</FormItem>
			</FormField>

			<FormField
				v-slot="{ componentField }"
				name="description"
			>
				<FormItem>
					<FormLabel>Description</FormLabel>

					<FormControl>
						<TheTextarea
							type="texterea"
							placeholder="Description de l'incident"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField name="incidentDate">
					<FormItem class="flex flex-col justify-around">
						<FormLabel>Date de l'incident</FormLabel>

						<ThePopover>
							<PopoverTrigger as-child>
								<FormControl>
									<ButtonPrimary
										variant="outline"
										:class="cn(
											'ps-3 text-start font-normal',
											!incidentDate && 'text-muted-foreground',
										)"
									>
										<span>{{ incidentDate ? df.format(toDate(incidentDate)) : "Choisir une date" }}</span>

										<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
									</ButtonPrimary>
								</FormControl>
							</PopoverTrigger>

							<PopoverContent class="w-auto p-0">
								<TheCalendar
									v-model:placeholder="incidentDatePlaceholder"
									v-model="incidentDate"
									calendar-label="Date de début"
									initial-focus
									@update:model-value="(v) => {
										if (v) {
											setFieldValue('incidentDate', v.toString())
										}
										else {
											setFieldValue('incidentDate', undefined)
										}
									}"
								/>
							</PopoverContent>
						</ThePopover>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="incidentTime"
				>
					<FormItem>
						<FormLabel>Heure de l'incident</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="12:30"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>

			<FormField
				v-slot="{ componentField }"
				name="location"
			>
				<FormItem>
					<FormLabel>Lieu de l'incident</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="11 rue de la Paix, 75000 Paris"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>

			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Ajouter l'incident
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
