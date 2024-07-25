export const validateTitulo = (titulo) => {
    if (typeof titulo !== 'string') {
        return 'El título debe ser una cadena de texto';
    }
    if (!titulo) {
        return 'El título es requerido';
    } else if (titulo.length < 3) {
        return 'El título debe tener al menos 3 caracteres';
    } else if (titulo.length > 50) {
        return 'El título no puede tener más de 50 caracteres';
    }
    return '';
};

export const validateDescription = (description) => {
    if (typeof description !== 'string') {
        return 'La descripción debe ser una cadena de texto';
    }
    if (!description) {
        return 'La descripción es requerida';
    } else if (description.length < 10) {
        return 'La descripción debe tener al menos 10 caracteres';
    } else if (description.length > 300) {
        return 'La descripción no puede tener más de 300 caracteres';
    }
    return '';
};

export const validateImagen = (imagen) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!imagen) {
        return 'La URL de la imagen es requerida';
    } else if (!urlPattern.test(imagen)) {
        return 'Debe ser una URL válida';
    }
    const imagePattern = /\.(jpeg|jpg|gif|png)$/;
    if (!imagePattern.test(imagen)) {
        return 'La URL debe apuntar a una imagen válida (jpeg, jpg, gif, png)';
    }
    return '';
};

export const validateTiempoDePreparacion = (tiempo) => {
    if (!tiempo) {
        return 'El tiempo de preparación es requerido';
    } else if (tiempo < 1) {
        return 'El tiempo de preparación debe ser al menos 1 minuto';
    } else if (tiempo > 120) {
        return 'El tiempo de preparación no puede ser mayor a 120 minutos';
    }
    return '';
};

export const validatePrecio = (precio) => {
    if (!precio) {
        return 'El precio es requerido';
    } else if (precio < 0) {
        return 'El precio debe ser al menos 0';
    } else if (precio > 100000) {
        return 'El precio no puede ser mayor a 100000';
    }
    return '';
};

export const validateTag = (tag) => {
    const tagPattern = /^[a-zA-Z0-9]+$/;
    if (!tag) {
        return 'El tag es requerido';
    } else if (tag.length < 3) {
        return 'El tag debe tener al menos 3 caracteres';
    } else if (!tagPattern.test(tag)) {
        return 'El tag solo puede contener letras y números';
    }
    return '';
};
