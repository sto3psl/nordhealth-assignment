<template>
	<main>
		<nord-stack>
			<nord-card padding="l">
				<h1 slot="header">Brainnotes</h1>
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
							:error="errors.get('email')?.message"
							@change="handleChange"
						/>
						<nord-input
							name="password"
							label="Password"
							:type="showPassword ? 'text' : 'password'"
							:error="errors.get('password')?.message"
							required
							@change="handleChange"
						>
							<nord-button slot="end" type="button" square @click="toggleShowPassword">
								<nord-icon :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'" />
							</nord-button>
						</nord-input>

						<nord-button type="submit" variant="primary" :loading="isLoading" :disabled="isLoading">
							<nord-icon slot="start" name="interface-send" square />
							Log in
						</nord-button>
					</nord-stack>
				</form>
			</nord-card>
			<nord-card>
				Want to sign up?
				<router-link to="/auth/signup">Create an account</router-link>
			</nord-card>
		</nord-stack>
	</main>
</template>

<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Input"
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
	errors.value = new Map()

	login(formData.get("email") as string, formData.get("password") as string, {
		onRequest() {
			isLoading.value = true
		},
		onResponse({ response }) {
			isLoading.value = false
			if (response.ok) {
				navigateTo("/")
			} else {
				const err: ErrorMap = new Map()
				err.set("global", {
					code: "custom",
					message: "The given email or password are wrong.",
					path: ["global"],
				})
				errors.value = err
			}
		},
		onRequestError(error) {
			if (error instanceof ZodError) {
				errors.value = createErrorMap(error)
				console.log(errors.value)
			}
		},
	})
}

function handleChange(event: Event) {
	clearFormError(event, errors)
}
</script>
