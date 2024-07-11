// src/components/Login.jsx

import React, { useState } from 'react';
import { validateUsername, validatePassword } from '../App/validaciones'; // Importar funciones de validación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesomeIcon
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importar íconos de ojo

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validateUsername(username)) {
            setError('Invalid username: 6-8 characters, letters and numbers only, no spaces. Example: user123');
            return;
        }
        if (!validatePassword(password)) {
            setError(`Invalid password: 8-11 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character. Example: Password1!`);
            return;
        }
        // Aquí puedes agregar la lógica para validar las credenciales del usuario, por ahora simula una validación
        if (username === 'user123' && password === 'Password1!') {
            alert('Login successful');
            // Redirigir o hacer algo después del inicio de sesión exitoso
        } else {
            setError('Invalid credentials');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} // Cambia el tipo de input basado en showPassword
                                id="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
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
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


