import React, { useState } from 'react';

const USERNAMEREGEXP = /^[a-zA-Z0-9]{6,8}$/;
const PASSWORDREGEXP =
  /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?['#'?!@$%^&*-]).{8,11}$/;

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      passwordDetails: {},
    };

    // Validaciones para cada campo
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es obligatorio';
    } else if (!USERNAMEREGEXP.test(formData.username)) {
      newErrors.username =
        'El usuario debe contener entre 6 a 8 caracteres y sólo puede contener letras (mayúsculas y minúsculas) y números.';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'El rol es obligatorio';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (!PASSWORDREGEXP.test(formData.password)) {
      if (!/(?=.*[a-z])/.test(formData.password)) {
        newErrors.passwordDetails.lowercase =
          '· Debe contener al menos una letra minúscula';
      }

      if (!/(?=.*[A-Z])/.test(formData.password)) {
        newErrors.passwordDetails.uppercase =
          '· Debe contener al menos una letra mayúscula';
      }

      if (!/(?=.*\d)/.test(formData.password)) {
        newErrors.passwordDetails.number = '· Debe contener al menos un número';
      }

      if (!/(?=.*['#?!@$%^&*-])/.test(formData.password)) {
        newErrors.passwordDetails.specialChar =
          "· Debe contener al menos un carácter especial ('#?!@$%^&*-)";
      }

      if (!/.{8,11}$/.test(formData.password)) {
        newErrors.passwordDetails.length =
          '· Debe tener entre 8 y 11 caracteres';
      }
    }

    if (!newErrors.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6'>
      <div className='space-y-2'>
        <div>
          <label htmlFor='username'>Nombre de usuario:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='border border-black rounded-lg ml-2 mr-2'
          />
          {errors.username && (
            <span className='text-red-500 text-sm'>{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor='role'>Rol:</label>
          <select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='border border-black rounded-lg ml-2 mr-2'
          >
            <option value=''>Selecciona un rol</option>
            <option value='admin'>Administrador</option>
            <option value='waiter'>Mesero</option>
            <option value='kitchen'>Cocina</option>
            <option value='table'>Mesa</option>
          </select>
          {errors.role && (
            <span className='text-red-500 text-sm'>{errors.role}</span>
          )}
        </div>
        <div>
          <label htmlFor='password'>Contraseña:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='border border-black rounded-lg ml-2 mr-2'
            maxLength={11}
          />
          {/* Renderizado de errores generales de contraseña */}
          {errors.password && (
            <span className='text-red-500 text-sm'>{errors.password}</span>
          )}
          {/* Renderizado de errores detallados de contraseña */}
          {Object.keys(errors.passwordDetails || {}).map((errorKey) => (
            <span key={errorKey} className='text-red-500 text-sm block'>
              {errors?.passwordDetails[errorKey]}
            </span>
          ))}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='border border-black rounded-lg ml-2 mr-2'
            maxLength={11}
          />
          {errors.confirmPassword && (
            <span className='text-red-500 text-sm'>
              {errors.confirmPassword}
            </span>
          )}
        </div>
      </div>

      <div className='space-x-10'>
        <button
          type='submit'
          className='bg-purple-400 rounded-lg p-3 uppercase text-sm text-white font-bold'
        >
          Registrar
        </button>
        <button
          type='submit'
          className='bg-slate-400 rounded-lg p-3 uppercase text-sm text-white font-bold'
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
