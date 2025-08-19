import type * as z from "zod"

export type ErrorMap = Map<string, z.ZodError["issues"][number]>

export function createErrorMap(error: z.ZodError) {
	const errors: ErrorMap = new Map()

	for (const issue of error.issues) {
		errors.set(issue.path.join("."), issue)
	}
	return errors
}

export function clearFormError(event: Event, errors: Ref<ErrorMap>) {
	const { name } = event.target as HTMLInputElement
	if (!errors.value?.has(name)) return

	errors.value.delete(name)
	errors.value = new Map(errors.value)
}
