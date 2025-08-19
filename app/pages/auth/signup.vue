<template>
	<main>
		<nord-stack>
			<nord-card padding="l">
				<h1 slot="header">Welcome to Brainnotes</h1>
				<p slot="header-end">
					We're currently looking for interested folks to try our beta program. To sign up, please
					register an account and we'll notify you as soon as the app is ready.
				</p>
				<form @submit.prevent="handleSubmit">
					<nord-stack>
						<nord-banner v-if="errors.get('global')" variant="danger">{{
							errors.get("global")?.message
						}}</nord-banner>
						<nord-input
							label="Email"
							name="email"
							type="email"
							required
							:error="errors?.get('email')?.message"
							@change="handleChange"
						/>
						<nord-input
							name="password"
							label="Password"
							:type="showPassword ? 'text' : 'password'"
							hint="Must have at least 8 characters."
							required
							:error="errors?.get('password')?.message"
							@change="handleChange"
						>
							<nord-button slot="end" type="button" square @click="toggleShowPassword">
								<nord-icon :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'" />
							</nord-button>
						</nord-input>
						<nord-checkbox
							name="wants_updates"
							value="true"
							label="I want to receive occasional product updates and announcements."
						/>
						<nord-button type="submit" variant="primary" :loading="isLoading" :disabled="isLoading">
							<nord-icon slot="start" name="interface-send" square />
							Sign up
						</nord-button>
					</nord-stack>
				</form>
			</nord-card>
			<nord-card>
				Already signed up?
				<router-link to="/auth/login">Go to login</router-link>
			</nord-card>
		</nord-stack>
	</main>
</template>

<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Checkbox"
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Banner"
import "@nordhealth/components/lib/Card"
import "@nordhealth/components/lib/Icon"
import { ZodError } from "zod"

definePageMeta({
	layout: "center",
})

const showPassword = ref(false)
function toggleShowPassword() {
	showPassword.value = !showPassword.value
}

const isLoading = ref(false)
const errors = shallowRef<ErrorMap>(new Map())
async function handleSubmit(event: Event) {
	const formData = new FormData(event.target as HTMLFormElement)

	await signup(
		{
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			wants_updates: formData.get("wants_updates") === "true",
		},
		{
			onRequest() {
				isLoading.value = true
			},
			async onResponse({ response }) {
				isLoading.value = false
				if (response.ok) {
					navigateTo("/?success")
				} else {
					const err: ErrorMap = new Map()
					err.set("global", {
						code: "custom",
						message: "Unable to create account. Please try again later.",
						path: ["global"],
					})
					errors.value = err
				}
			},
			onRequestError(error) {
				if (error instanceof ZodError) {
					errors.value = createErrorMap(error)
				}
			},
		},
	)
}

function handleChange(event: Event) {
	clearFormError(event, errors)
}
</script>
