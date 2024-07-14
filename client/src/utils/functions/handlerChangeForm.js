import { registerForm } from '../api/registerForm';
import { validateForm } from './validateForm';

export function handleChangeForm(setFormData) {
  return (event) => {
    const valueWithoutSpaces = event.target.value.replace(/\s/g, '');

    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: valueWithoutSpaces,
    }));
  };
}

export function handlerSubmitRegister(formData, setErrors) {
  return async (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await registerForm(formData);
        console.log('Formulario enviado:', response);
      } catch (error) {
        console.error('Error en el registro, problema con el servidor:', error);
        setErrors({ submit: error.message });
      }
    }
  };
}

