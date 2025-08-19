import type { PublicAccount } from "../../shared/schemas"
import { updateAccountSchema } from "../../shared/schemas"
import { readSession, updateAccount } from "../utils/db"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { data, error } = updateAccountSchema.safeParse(body)

	if (error) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
			data: error.issues,
		})
	}

	const sessionID = getCookie(event, "session_id")

	if (!sessionID) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}

	try {
		const email = await readSession(sessionID)
		const account = await updateAccount(email, data)

		return {
			email: account.email,
			wants_updates: account.wants_updates,
		} satisfies PublicAccount
	} catch (error) {
		console.error(error)
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}
})
