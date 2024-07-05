import mongoose from 'mongoose'
import { USERNAMEREGEXP, PASSWORDREGEXP, NAMEREGEXP, SURNAMEREGEXP } from '../utils/regexpValidators'

const waiterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: {
            validator: (firstName) => NAMEREGEXP.test(firstName),
            message: invalidName => `${invalidName.value} no es un nombre valido!`
        },
        required: true,
    },
    surName: {
        type: String,
        validate: {
            validator: (surName) => SURNAMEREGEXP.test(surName),
            message: invalidSurname => `${invalidSurname.value} no es un apellido valido!`
        },
        required: true,
    },
    user: {
        type: String,
        validate: {
            validator: (userName) => USERNAMEREGEXP.test(userName),
            message: invalidUsername => `${invalidUsername.value} no es un usuario valido!`
        },
        required: true,
    },
    hourSalary: {
        type: Number,
        default: 5
    },
    password: {
        type: String,
        validate: {
            validator: (password) => PASSWORDREGEXP.test(password),
            message: passwordInvalid => `${passwordInvalid.value} no es un contraseña valida!`
        },
        required: true,
    },
    tablesAsigned: [

    ],
    moneyEarned: {
        type: Number,
        default: 0
    },
    isWaiter: {
        type: Boolean,
        required: true,
    }
})

const WaiterModel = mongoose.model('Waiter', waiterSchema)

export default WaiterModel