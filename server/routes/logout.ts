import { deleteSession } from "../utils/db"

export default defineEventHandler(async (event) => {
	const sessionID = getCookie(event, "session_id")

	if (sessionID) {
		// Delete session in database
		await deleteSession(sessionID)
	}

	// Instruct browser to remove all locally stored data (cookies, localStorage, ...)
	setHeader(event, "Clear-Site-Data", '"*"')

	// not all versions of Safari support the "Clear-Site-Data" header so we remove the cookie manually as well
	deleteCookie(event, "session_id")

	sendRedirect(event, "/")
})
