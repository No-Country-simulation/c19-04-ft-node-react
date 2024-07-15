const USERNAMEREGEXP = /^[a-zA-Z0-9]{6,8}$/
const PASSWORDREGEXP =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*['#'?!@$%^&*-]).{8,11}$/

export function validateForm(formData) {
	const errors = {
		passwordDetails: {},
	}

	if (!formData.username.trim()) {
		errors.username = 'El usuario es obligatorio'
	} else if (!USERNAMEREGEXP.test(formData.username)) {
		errors.username =
			'El usuario debe contener entre 6 a 8 caracteres y sólo puede contener letras (mayúsculas y minúsculas) y números.'
	}

	if (!formData.role.trim()) {
		errors.role = 'El rol es obligatorio'
	}

	if (!formData.password.trim()) {
		errors.password = 'La contraseña es obligatoria'
	} else if (!PASSWORDREGEXP.test(formData.password)) {
		if (!/(?=.*[a-z])/.test(formData.password)) {
			errors.passwordDetails.lowercase =
				'· Debe contener al menos una letra minúscula'
		}

		if (!/(?=.*[A-Z])/.test(formData.password)) {
			errors.passwordDetails.uppercase =
				'· Debe contener al menos una letra mayúscula'
		}

		if (!/(?=.*\d)/.test(formData.password)) {
			errors.passwordDetails.number = '· Debe contener al menos un número'
		}

		if (!/(?=.*['#?!@$%^&*-])/.test(formData.password)) {
			errors.passwordDetails.specialChar =
				"· Debe contener al menos un carácter especial ('#?!@$%^&*-)"
		}

		if (!/.{8,11}$/.test(formData.password)) {
			errors.passwordDetails.length = '· Debe tener entre 8 y 11 caracteres'
		}
	}

	if (formData.password !== formData.confirmPassword) {
		errors.confirmPassword = 'Las contraseñas no coinciden'
	}

	return errors
}
