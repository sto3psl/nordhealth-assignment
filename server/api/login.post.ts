import { verifyPassword } from "../utils/password"
import { loginSchema } from "~~/shared/schemas"
import { createSession, readAccount } from "../utils/db"

export default defineEventHandler(async (event) => {
	const rawData = await readBody(event)

	const { data, error } = loginSchema.safeParse(rawData)

	if (error) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
			data: error.issues,
		})
	}

	const account = await readAccount(data.email)

	if (!account) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}

	const isCorrectPassword = await verifyPassword(data.password, account.salted_hash)

	if (!isCorrectPassword) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}

	const sessionID = crypto.randomUUID()

	await createSession(sessionID, account.email)

	setCookie(event, "session_id", sessionID, {
		secure: import.meta.dev ? false : true,
		httpOnly: true,
	})

	return setResponseStatus(event, 200)
})
