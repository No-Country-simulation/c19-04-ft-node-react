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
  console.log(formData);
  return (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData);
    }
  };
}

