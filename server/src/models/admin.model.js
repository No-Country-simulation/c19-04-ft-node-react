import mongoose from 'mongoose'
import regexpValidators from '../utils/regexpValidators.js'

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: (userName) => regexpValidators.USERNAMEREGEXP.test(userName),
            message: invalidUsername => `${invalidUsername.value} no es un usuario valido!`,
        },
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: "admin"
})

const AdminModel = mongoose.model('Admin', adminSchema)

export default AdminModel