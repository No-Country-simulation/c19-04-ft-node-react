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

    //submite pasa las comprobaciones
    const newErrors = validateForm(formData);

    //setea los errores para luego tratar de hacer la llamada
    setErrors(newErrors);

    //crear una funcion para Esta transformacion
    const dataApi = dataToApi(formData);

    if (
      Object.keys(newErrors).length <= 1 &&
      Object.keys(newErrors.passwordDetails).length === 0
    ) {
      try {
        const response = await registerForm(dataApi);
        console.log(response)
        if(response.status === 201){
          navigate("/register-successfully");
        } 
        if(response.response.status === 404 ) {
          navigate("/register-denied")
        }
        

      } catch (error) {
        console.error("Error en el registro, problema con el servidor:", error);
        setErrors({ submit: error.message });
      }
    }
  };
}
