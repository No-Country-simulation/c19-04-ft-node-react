import React, { useState } from "react";
import {
  handlerSubmitRegister,
  handleChangeForm,
} from "../../utils/functions/handlerChangeForm";
import { usePasswordVisibility } from "../../utils/hooks/usePassworVisibility";
import eyeIconSVG from "../../../src/assets/svg/eye.svg";
import eyeOffIconSVG from "../../../src/assets/svg/eye-off.svg";
import { cleanData } from "../../utils/functions/cleanData";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";

const RegisterUser = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, togglePasswordVisibility] = usePasswordVisibility();
  const [showConfirmPassword, toggleConfirmPasswordVisibility] =
    usePasswordVisibility();

  const { navigateTo } = useNavigateHelper();

  const handleCancelClick = () => {
    setFormData(cleanData(formData));
    closeModal();
  };

  return (
    <form
      onSubmit={handlerSubmitRegister(formData, setErrors, navigateTo)}
      className="space-y-10 sm:w-80"
    >
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChangeForm(setFormData)}
            className="bg-slate-200 rounded-3xl px-5 pb-4 pt-6 w-full peer placeholder-shown:pt-4 transition-all duration-300 placeholder-transparent"
          />
          <label
            htmlFor="username"
            className="absolute inset-0 top-1 left-3 text-[0.7rem] text-green rounded-lg px-2 uppercase peer-placeholder-shown:-translate-x-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:normal-case transition-all duration-300 cursor-text"
          >
            Nombre de usuario
          </label>
          {errors.username && (
            <span className="text-red-400 text-sm pl-2">{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="role" className="sr-only">
            Rol:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChangeForm(setFormData)}
            placeholder="Rol"
            className="bg-slate-200  rounded-3xl px-4 py-4 w-full cursor-pointer"
          >
            <option value="" className="text-gray-400">
              Selecciona un rol
            </option>
            <option value="admin">Administrador</option>
            <option value="waiter">Mesero/a</option>
            <option value="kitchen">Cocina</option>
            <option value="table">Mesa</option>
          </select>
          {errors.role && (
            <span className="text-red-400 text-sm pl-2">{errors.role}</span>
          )}
        </div>
        <div>
          <div className="relative flex items-center justify-end">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChangeForm(setFormData)}
              className="bg-slate-200 rounded-3xl px-5 pb-4 pt-6 w-full peer placeholder-shown:pt-4 transition-all duration-300 placeholder-transparent"
              maxLength={11}
            />
            <label
              htmlFor="password"
              className="absolute inset-0 top-1 left-3 text-[0.7rem] text-green rounded-lg px-2 uppercase peer-placeholder-shown:-translate-x-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:normal-case transition-all duration-300 cursor-text"
            >
              Contraseña
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2"
            >
              {showPassword ? (
                <img
                  src={eyeOffIconSVG}
                  alt="Hide password button"
                  className="mx-auto w-6"
                />
              ) : (
                <img
                  src={eyeIconSVG}
                  alt="Show password button"
                  className="mx-auto w-6"
                />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-400 text-sm pl-2">{errors.password}</span>
          )}
          {Object.keys(errors.passwordDetails || {}).map((errorKey) => (
            <span key={errorKey} className="text-red-400 text-sm pl-2 block">
              {errors?.passwordDetails[errorKey]}
            </span>
          ))}
        </div>
        <div>
          <div className="relative flex items-center justify-end">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChangeForm(setFormData)}
              className="bg-slate-200 rounded-3xl px-5 pb-4 pt-6 w-full peer placeholder-shown:pt-4 transition-all duration-300 placeholder-transparent"
              maxLength={11}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute inset-0 top-1 left-3 text-[0.7rem] text-green rounded-lg px-2 uppercase peer-placeholder-shown:-translate-x-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:normal-case transition-all duration-300 cursor-text"
            >
              Confirmar Contraseña
            </label>
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2"
            >
              {showConfirmPassword ? (
                <img
                  src={eyeOffIconSVG}
                  alt="Hide confirm password button"
                  className="mx-auto w-6"
                />
              ) : (
                <img
                  src={eyeIconSVG}
                  alt="Show confirm password button"
                  className="mx-auto w-6"
                />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-400 text-sm pl-2">
              {errors.confirmPassword}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-6">
        <button
          type="submit"
          className="bg-customRed-400 rounded-2xl p-4 uppercase text-sm text-white font-bold w-full transition-transform duration-200 sm:hover:scale-110 hover:bg-customRed-300"
        >
          Registrar
        </button>
        <button
          type="button"
          className="bg-customRed-400 rounded-2xl p-4 uppercase text-sm text-white font-bold w-full transition-transform duration-200 sm:hover:scale-110 hover:bg-customRed-300"
          onClick={() => handleCancelClick()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default RegisterUser;
