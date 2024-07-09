import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    genero: "",
    fechaNacimiento: "",
    dni: "",
    terminosCondiciones: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validaciones para cada campo
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(formData.nombre)) {
      newErrors.nombre =
        "El nombre solo puede contener letras, espacios y tildes";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    }

    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(formData.apellido)) {
      newErrors.apellido =
        "El apellido solo puede contener letras, espacios y tildes";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.contraseña.trim()) {
      newErrors.contraseña = "La contraseña es obligatoria";
    } else if (!/^(?=.*[A-Z])(?=.*\d{2,}).{8,}$/.test(formData.contraseña)) {
      newErrors.contraseña =
        "Tu contraseña debe ser fuerte para mantener tus datos seguros. Asegúrate de que tenga mínimo 8 caracteres, una letra mayúscula y al menos dos números.";
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden";
    }

    if (!formData.genero.trim()) {
      newErrors.genero = "El género es obligatorio";
    }

    if (!formData.fechaNacimiento.trim()) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio";
    }

    if (!formData.terminosCondiciones) {
      newErrors.terminosCondiciones =
        "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Formulario enviado:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.nombre && <span style={{ color: "red" }}>{errors.nombre}</span>}
      </div>

      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.apellido && (
          <span style={{ color: "red" }}>{errors.apellido}</span>
        )}
      </div>

      <div>
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.fechaNacimiento && (
          <span style={{ color: "red" }}>{errors.fechaNacimiento}</span>
        )}
      </div>

      <div>
        <label htmlFor="dni">DNI:</label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.dni && <span style={{ color: "red" }}>{errors.dni}</span>}
      </div>

      <div>
        <label htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        >
          <option value="">Selecciona un género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
          <option value="prefiero no decirlo">Prefiero no decirlo</option>
        </select>
        {errors.genero && <span style={{ color: "red" }}>{errors.genero}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="contraseña">Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.contraseña && (
          <span style={{ color: "red" }}>{errors.contraseña}</span>
        )}
      </div>

      <div>
        <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmarContraseña"
          name="confirmarContraseña"
          value={formData.confirmarContraseña}
          onChange={handleChange}
          className="border border-black rounded-lg ml-2"
        />
        {errors.confirmarContraseña && (
          <span style={{ color: "red" }}>{errors.confirmarContraseña}</span>
        )}
      </div>

      <div>
        <input
          type="checkbox"
          id="terminosCondiciones"
          name="terminosCondiciones"
          checked={formData.terminosCondiciones}
          onChange={handleChange}
        />
        <label htmlFor="terminosCondiciones">
          Acepto los términos y condiciones
        </label>
        {errors.terminosCondiciones && (
          <span style={{ color: "red" }}>{errors.terminosCondiciones}</span>
        )}
      </div>

      <button type="submit" className="bg-purple-400 rounded-lg p-2">
        Enviar
      </button>
    </form>
  );
}
