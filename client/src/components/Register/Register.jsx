import React, { useState } from 'react';
import {
  handlerSubmitRegister,
  handleChangeForm,
} from '../../utils/functions/handlerChangeForm';
import { usePasswordVisibility } from '../../utils/hooks/usePassworVisibility';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, togglePasswordVisibility] = usePasswordVisibility();
  const [showConfirmPassword, toggleConfirmPasswordVisibility] =
    usePasswordVisibility();

  return (
    <form
      onSubmit={handlerSubmitRegister(formData, setErrors)}
      className="space-y-6 p-6"
    >
      <div className="space-y-2">
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChangeForm(setFormData)}
            className="border border-black rounded-lg ml-2 mr-2"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChangeForm(setFormData)}
            className="border border-black rounded-lg ml-2 mr-2"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="waiter">Mesero/a</option>
            <option value="kitchen">Cocina</option>
            <option value="table">Mesa</option>
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChangeForm(setFormData)}
              className="border border-black rounded-lg ml-2 mr-2"
              maxLength={11}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
          {Object.keys(errors.passwordDetails || {}).map((errorKey) => (
            <span key={errorKey} className="text-red-500 text-sm block">
              {errors?.passwordDetails[errorKey]}
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChangeForm(setFormData)}
              className="border border-black rounded-lg ml-2 mr-2"
              maxLength={11}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword}
            </span>
          )}
        </div>
      </div>

      <div className="space-x-10">
        <button
          onClick={handlerSubmitRegister}
          type="submit"
          className="bg-purple-400 rounded-lg p-3 uppercase text-sm text-white font-bold"
        >
          Registrar
        </button>
        <button
          type="button"
          className="bg-slate-400 rounded-lg p-3 uppercase text-sm text-white font-bold"
          onClick={() =>
            setFormData({
              username: '',
              role: '',
              password: '',
              confirmPassword: '',
            })
          }
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default RegisterUser;
