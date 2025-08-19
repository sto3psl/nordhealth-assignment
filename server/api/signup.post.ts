import { hashPassword } from "../utils/password"
import { signupSchema } from "~~/shared/schemas"
import { createAccount, createSession } from "../utils/db"

export default defineEventHandler(async (event) => {
	const rawData = await readBody(event)

	const { data, error } = signupSchema.safeParse(rawData)

	if (error) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
			data: error.issues,
		})
	}

	const existingUser = await readAccount(data.email)

	if (existingUser) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}

	await createAccount({
		email: data.email,
		salted_hash: await hashPassword(data.password),
		wants_updates: data.wants_updates,
	})

	const sessionID = crypto.randomUUID()

	await createSession(sessionID, data.email)

	setCookie(event, "session_id", sessionID, {
		secure: import.meta.dev ? false : true,
		httpOnly: true,
	})

	return setResponseStatus(event, 204)
})
