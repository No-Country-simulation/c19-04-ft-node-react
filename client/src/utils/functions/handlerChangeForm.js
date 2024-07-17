import { registerForm } from "../api/registerForm";
import { dataToApi } from "./dataToApi";
import { validateForm } from "./validateForm";

export function handleChangeForm(setFormData) {
  return (event) => {
    const valueWithoutSpaces = event.target.value.replace(/\s/g, "");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: valueWithoutSpaces,
    }));
  };
}

export function handlerSubmitRegister(formData, setErrors, navigate) {
  return async (event) => {
    event.preventDefault();

    // Submite pasa las comprobaciones
    const newErrors = validateForm(formData);

    // Setea los errores para luego tratar de hacer la llamada
    setErrors(newErrors);

    // Crear una función para esta transformación
    const dataApi = dataToApi(formData);

    if (
      Object.keys(newErrors).length <= 1 &&
      Object.keys(newErrors.passwordDetails).length === 0
    ) {
      try {
        const response = await registerForm(dataApi);

        if (response && response.status === 201) {
          navigate("/register-successfully");
        }
      } catch (error) {
        console.error("Error en el registro, problema con el servidor:", error);

        if (error.response) {
          if (
            error.response.status === 404 &&
            error.response.data.message ===
              "The user that attempt to register already exists"
          ) {
            navigate("/register-denied");
          }
        } else if (error.code === "ERR_NETWORK") {
          navigate("/register-offline");
        } else {
          setErrors({ submit: error.message });
        }
      }
    }
  };
}
