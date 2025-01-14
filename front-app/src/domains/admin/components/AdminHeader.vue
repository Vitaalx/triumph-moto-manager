<script setup lang="ts">
import AccountDropdown from "@/domains/user/components/AccountDropdown.vue";
import AdminMobileNavbar from "../components/AdminMobileNavbar.vue";


</script>

<template>
	<header class="h-28 px-8 flex gap-4 items-center border-b bg-muted/50">
		<AdminMobileNavbar />

		<div class="w-full flex-1 text-center md:text-start">
			<span class=" text-xl">
				Bonjour admin 👋
				Vous êtes <strong>ADMIN</strong>.
			</span>
		</div>

		<AccountDropdown />
	</header>
</template>
