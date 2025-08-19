import type { UpdatedAccount, SignupData } from "../../shared/schemas"
import { loginSchema, updateAccountSchema, signupSchema } from "../../shared/schemas"

type FetchOptions = Parameters<typeof $fetch>[1]

export async function signup(newAccount: SignupData, options?: FetchOptions) {
	try {
		const data = signupSchema.parse(newAccount)

		await $fetch("/api/signup", {
			...options,
			method: "POST",
			body: data,
		})
	} catch (error) {
		// @ts-expect-error I only pass functions for `onRequestError`
		options?.onRequestError?.(error)
	}
}

export async function login(email: string, password: string, options?: FetchOptions) {
	try {
		const data = loginSchema.parse({ email, password })

		await $fetch("/api/login", {
			...options,
			method: "POST",
			body: data,
		})
	} catch (error) {
		// @ts-expect-error I only pass functions for `onRequestError`
		options?.onRequestError?.(error)
	}
}

export async function updateAccount(updatedAccount: UpdatedAccount, options?: FetchOptions) {
	const data = updateAccountSchema.parse(updatedAccount)

	await $fetch("/api/account", {
		...options,
		method: "POST",
		body: data,
	})
}
