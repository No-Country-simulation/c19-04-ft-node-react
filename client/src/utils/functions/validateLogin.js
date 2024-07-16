export const validateUsername = (username) => {
    const errors = [];
    if (!/^[a-z0-9]{6,8}$/.test(username)) {
        if (username.length < 6 || username.length > 8) {
            errors.push('El nombre de usuario debe tener entre 6 y 8 caracteres.');
        }
        if (/\s/.test(username)) {
            errors.push('El nombre de usuario no debe contener espacios.');
        }
        if (!/^[a-z0-9]+$/.test(username)) {
            errors.push('El nombre de usuario debe contener solo letras minúsculas y números.');
        }
    }
    return errors;
};

export const validatePassword = (password) => {
    const errors = [];
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*['#'?!@$%^&-]).{8,11}$/.test(password)) {
        if (password.length < 8 || password.length > 11) {
            errors.push('La contraseña debe tener entre 8 y 11 caracteres.');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra mayúscula.');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra minúscula.');
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push('La contraseña debe contener al menos un dígito.');
        }
        if (!/(?=.*['#'?!@$%^&-])/.test(password)) {
            errors.push('La contraseña debe contener al menos un carácter especial (#\'?!@$%^&-).');
        }
    }
    return errors;
};


