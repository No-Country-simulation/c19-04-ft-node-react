import { validateForm } from "./validateForm";

export function handleChangeForm(setFormData) {
  return (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
}

export function handlerSubmitRegister(formData, setErrors) {
  return (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Formulario enviado:", formData);
    }
  };
}
