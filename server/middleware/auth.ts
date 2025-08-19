import type { DBAccount } from "~~/shared/schemas"

export default defineEventHandler(async (event) => {
	const url = getRequestURL(event)

	// API routes do their own authentication
	if (url.pathname.startsWith("/api")) {
		return
	}

	const store = useStorage("memoryDB")

	const sessionID = getCookie(event, "session_id")

	const email = await store.get(`session:${sessionID}`)

	const account = (await store.get(`account:${email}`)) as DBAccount

	if (url.pathname.startsWith("/auth") && account) {
		sendRedirect(event, "/")
		return
	}

	if (!url.pathname.startsWith("/auth") && !account) {
		sendRedirect(event, "/auth/signup")
	}
})
