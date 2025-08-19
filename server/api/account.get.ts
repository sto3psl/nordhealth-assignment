import type { PublicAccount } from "~~/shared/schemas"
import { readAccount, readSession } from "../utils/db"

export default defineEventHandler(async (event) => {
	const sessionID = getCookie(event, "session_id")

	if (!sessionID) {
		throw createError({
			statusCode: 400,
			statusText: "Bad Request",
		})
	}

	try {
		const email = await readSession(sessionID)
		const account = await readAccount(email)

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
