import React, { useState } from 'react';
import {
  handlerSubmitRegister,
  handleChangeForm,
} from '../../utils/functions/handlerChangeForm';
import { usePasswordVisibility } from '../../utils/hooks/usePassworVisibility';
import eyeIconSVG from '../../../src/assets/svg/eye.svg';
import eyeOffIconSVG from '../../../src/assets/svg/eye-off.svg';
import { cleanData } from '../../utils/functions/cleanData';
import { useNavigateHelper } from '../../utils/hooks/useNavigations';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, togglePasswordVisibility] = usePasswordVisibility();
  const [showConfirmPassword, toggleConfirmPasswordVisibility] = usePasswordVisibility();

  const { navigateTo } = useNavigateHelper();

  return (
    <form
      onSubmit={handlerSubmitRegister(formData, setErrors, navigateTo )}
      className='space-y-10 w-80'
    >
      <div className='space-y-4'>
        <div>
          <label htmlFor='username' className='sr-only'>
            Nombre de usuario:
          </label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Nombre de usuario'
            value={formData.username}
            onChange={handleChangeForm(setFormData)}
            className='bg-slate-300 rounded-lg p-2 w-full'
          />
          {errors.username && (
            <span className='text-red-400 text-sm pl-2'>{errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor='role' className='sr-only'>
            Rol:
          </label>
          <select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChangeForm(setFormData)}
            placeholder='Rol'
            className='bg-slate-300 rounded-lg p-2 w-full'
          >
            <option value='' className='text-gray-400'>
              Selecciona un rol
            </option>
            <option value='admin'>Administrador</option>
            <option value='waiter'>Mesero/a</option>
            <option value='kitchen'>Cocina</option>
            <option value='table'>Mesa</option>
          </select>
          {errors.role && (
            <span className='text-red-400 text-sm pl-2'>{errors.role}</span>
          )}
        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            Contraseña:
          </label>
          <div className='relative flex items-center justify-end'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleChangeForm(setFormData)}
              className='bg-slate-300 rounded-lg p-2 w-full'
              maxLength={11}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-2'
            >
              {showPassword ? (
                <img
                  src={eyeOffIconSVG}
                  alt='Hide password button'
                  className='mx-auto w-6'
                />
              ) : (
                <img
                  src={eyeIconSVG}
                  alt='Show password button'
                  className='mx-auto w-6'
                />
              )}
            </button>
          </div>
          {errors.password && (
            <span className='text-red-400 text-sm pl-2'>{errors.password}</span>
          )}
          {Object.keys(errors.passwordDetails || {}).map((errorKey) => (
            <span key={errorKey} className='text-red-400 text-sm pl-2 block'>
              {errors?.passwordDetails[errorKey]}
            </span>
          ))}
        </div>
        <div>
          <label htmlFor='confirmPassword' className='sr-only'>
            Confirmar Contraseña:
          </label>
          <div className='relative flex items-center justify-end'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirmar contraseña'
              value={formData.confirmPassword}
              onChange={handleChangeForm(setFormData)}
              className='bg-slate-300 rounded-lg p-2 w-full'
              maxLength={11}
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-2'
            >
              {showConfirmPassword ? (
                <img
                  src={eyeOffIconSVG}
                  alt='Hide confirm password button'
                  className='mx-auto w-6'
                />
              ) : (
                <img
                  src={eyeIconSVG}
                  alt='Show confirm password button'
                  className='mx-auto w-6'
                />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className='text-red-400 text-sm pl-2'>
              {errors.confirmPassword}
            </span>
          )}
        </div>
      </div>
      <div className='flex gap-6'>
        <button
          // onClick={handlerSubmitRegister(formData, setErrors)} //testear si borrando esto Funciona el OnSubmit
          type='submit'
          className='bg-customBlue rounded-lg p-3 uppercase text-sm text-white font-bold w-full hover:bg-sky-600'
        >
          Registrar
        </button>
        <button
          type='button'
          className='bg-customBlue rounded-lg p-3 uppercase text-sm text-white font-bold w-full hover:bg-sky-600'
          onClick={() => {
            setFormData(cleanData(formData))
            console.log(cleanData(formData));
            // setFormData({ // crear una funcion que limpie el estado de formData
            //   username: '',
            //   role: '',
            //   password: '',
            //   confirmPassword: '',
            // })
          }
          }
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default RegisterUser;
