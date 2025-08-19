import type { DBAccount, UpdatedAccount } from "~~/shared/schemas"

const ACCOUNT_KEY = "account:"
const SESSION_KEY = "session:"

function createUserKey(email: string) {
	return ACCOUNT_KEY.concat(email)
}

function createSessionKey(id: string) {
	return SESSION_KEY.concat(id)
}

export async function readAccount(email: string) {
	const store = useStorage("memoryDB")

	return (await store.get(createUserKey(email))) as DBAccount
}

export async function createAccount(account: DBAccount) {
	const store = useStorage("memoryDB")

	await store.set(createUserKey(account.email), account)
}

export async function updateAccount(email: string, data: UpdatedAccount) {
	const store = useStorage("memoryDB")

	const account = await readAccount(email)

	Object.assign(account, data)

	await store.set(createUserKey(email), account)

	return account
}

export async function createSession(id: string, email: string) {
	const store = useStorage("memoryDB")

	await store.set(createSessionKey(id), email)
}

export async function deleteSession(id: string) {
	const store = useStorage("memoryDB")

	await store.del(createSessionKey(id))
}

export async function readSession(id: string) {
	const store = useStorage("memoryDB")

	return (await store.get(createSessionKey(id))) as string
}
