const encoder = new TextEncoder()
const decoder = new TextDecoder()

/**
 * Internal hashing function using SHA-256.
 *
 * *In a real production app this should use a secure hashing algorithm like PBKDF2, bcrypt or
 * Argon2id with a sufficiently high iteration count or work factor.*
 *
 * More information: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
 */
async function computeHash(password: string, salt: string) {
	const data = encoder.encode(password.concat(salt))
	const hashBuffer = await crypto.subtle.digest("SHA-256", data)

	return decoder.decode(hashBuffer)
}

/**
 * Method to hash a password with a randomly generated salt.
 *
 * *In a real production app this should use a salt and secret pepper for hashing.*
 */
export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
	const saltBuffer = crypto.getRandomValues(new Uint8Array(16))

	const salt = decoder.decode(saltBuffer)

	const hash = await computeHash(password, salt)

	return { salt, hash }
}

/**
 * Verify a clear text password against a salted hash for authentication purposes.
 */
export async function verifyPassword(password: string, saltedHash: { salt: string; hash: string }) {
	const { salt, hash } = saltedHash

	const hashedPassword = await computeHash(password, salt)

	return hashedPassword === hash
}
