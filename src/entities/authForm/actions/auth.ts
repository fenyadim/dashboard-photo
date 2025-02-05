import { FormState, registrationSchema } from '../model/validationSchema'

export const registerAction = async (state: FormState, formData: FormData) => {
	const validatedFields = registrationSchema.safeParse({
		fullName: formData.get('fullName'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	})

	if (!validatedFields.success) {
		console.log(validatedFields)
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	console.log(validatedFields)
}
