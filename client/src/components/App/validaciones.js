// src/utils/validation.js

// Función para validar el nombre de usuario
export function validateUsername(username) {
    // El nombre de usuario debe tener entre 6 y 8 caracteres, sin espacios, y contener letras y números
    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/;
    return usernameRegex.test(username);
}

// Función para validar la contraseña
export function validatePassword(password) {
    // La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un dígito, 
    // uno de los caracteres especiales y debe estar entre 8 y 11 caracteres de longitud
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*['#'?!@$%^&-]).{8,11}$/;
    return passwordRegex.test(password);
}

