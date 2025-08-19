import * as z from "zod"

export const signupSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	wants_updates: z.boolean().optional().default(false),
})
export type SignupData = z.infer<typeof signupSchema>
export type DBAccount = Pick<SignupData, "email" | "wants_updates"> & {
	salted_hash: { salt: string; hash: string }
}
export type PublicAccount = Pick<SignupData, "email" | "wants_updates">

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().nonempty(),
})
export type LoginData = z.infer<typeof loginSchema>

export const updateAccountSchema = z.object({
	wants_updates: z.boolean(),
})
export type UpdatedAccount = z.infer<typeof updateAccountSchema>
