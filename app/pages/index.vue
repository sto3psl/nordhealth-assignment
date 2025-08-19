<template>
	<main>
		<div class="n-typeset">
			<h1>Hi there 👋</h1>
			<p>Thank you for signing up to Brainnotes.</p>
		</div>
		<nord-card class="details">
			<h2 slot="header">Account Details</h2>
			<nord-stack v-if="data">
				<nord-input :value="data.email" readonly label="Email" />
				<nord-toggle
					:checked="data.wants_updates"
					label="Notifications"
					@change="toggleNotifications"
				>
					<div slot="hint">
						I want to receive occasional updates and announcements in addition to the release
						notification.
					</div>
				</nord-toggle>
			</nord-stack>
		</nord-card>
		<nord-button href="/logout">Log out</nord-button>

		<nord-modal size="m" :open="showSuccess" @close="showSuccess = false">
			<img src="~/assets/celebration.svg" alt="Two women celebrating with ballons. Illustrated." />
			<div class="n-reset n-typeset">
				<h1>We are happy you are here!</h1>
				<p>Thank you for signing up for Brainnotes. Once the app is ready we'll notify you!</p>
				<p>While you wait you can update your notification settings.</p>
			</div>
			<form slot="footer" method="dialog">
				<nord-button expand variant="primary">Close</nord-button>
			</form>
		</nord-modal>
	</main>
</template>

<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Card"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Toggle"
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Modal"

definePageMeta({
	layout: "center",
})

const route = useRoute()
const router = useRouter()

const { data } = await useAsyncData("account", async () => {
	const account = await $fetch("/api/account")

	return account
})

async function toggleNotifications(e: InputEvent) {
	const { checked } = e.target as HTMLInputElement

	await updateAccount(
		{
			wants_updates: checked,
		},
		{
			async onResponse() {
				await refreshNuxtData("account")
			},
		},
	)
}

const showSuccess = ref(false)
onMounted(() => {
	if ("success" in route.query) {
		showSuccess.value = true
		router.replace("/")
	}
})
</script>

<style scoped>
nord-modal h1 {
	margin-block-start: var(--n-space-l);
}

.details {
	margin-block: var(--n-space-l);
}
</style>
