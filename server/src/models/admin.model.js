//modelo de admin

// Usuario
// Contraseña
// isAdmin

import mongoose from 'mongoose'
import { USERNAMEREGEXP, PASSWORDREGEXP, NAMEREGEXP, SURNAMEREGEXP } from '../utils/regexpValidators'

const waiterSchema = new mongoose.Schema({
    user: {
        type: String,
        validate: {
            validator: (userName) => USERNAMEREGEXP.test(userName),
            message: invalidUsername => `${invalidUsername.value} no es un usuario valido!`
        },
        required: true,
    },
    password: {
        type: String,
        validate: {
            validator: (password) => PASSWORDREGEXP.test(password),
            message: passwordInvalid => `${passwordInvalid.value} no es un contraseña valida!`
        },
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
})

const WaiterModel = mongoose.model('Waiter', waiterSchema)

export default WaiterModel