import React, { useState } from 'react';
import { validateUsername, validatePassword } from '../../utils/functions/validateLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../utils/api/Loginapi';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const usernameValidationErrors = validateUsername(username);
        const passwordValidationErrors = validatePassword(password);

        if (usernameValidationErrors.length > 0) {
            setUsernameErrors(usernameValidationErrors);
            return;
        }

        if (passwordValidationErrors.length > 0) {
            setPasswordErrors(passwordValidationErrors);
            return;
        }

        setUsernameErrors([]);
        setPasswordErrors([]);

        try {
            const { data, message } = await login(username, password);
            setLoginMessage(message);
            // Maneja la respuesta de la autenticación
            console.log(data);
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white sm:bg-customBlue">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Inicio de Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameErrors([]);
                                setLoginError('');
                                setLoginMessage('');
                            }}
                            required
                        />
                        <p className="text-gray-500 text-sm mt-1">Ejemplo: user123</p>
                        {usernameErrors.length > 0 && (
                            <ul className="text-red-500 text-sm mt-2">
                                {usernameErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordErrors([]);
                                    setLoginError('');
                                    setLoginMessage('');
                                }}
                                required
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Ejemplo: Password1!</p>
                        {passwordErrors.length > 0 && (
                            <ul className="text-red-500 text-sm mt-2">
                                {passwordErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full bg-customBlue text-white py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Iniciar Sesión
                        </button>
                        {loginError && (
                            <p className="text-red-500 text-sm mt-4">{loginError}</p>
                        )}
                        {loginMessage && (
                            <p className="text-green-500 text-sm mt-4">{loginMessage}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
