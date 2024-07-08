import mongoose from 'mongoose'

const waiterSchema = new mongoose.Schema({
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
    hourSalary: {
        type: Number,
        default: 5
    },
    tablesAsigned: {
        type: Object,
        default: []
    }
    ,
    moneyEarned: {
        type: Number,
        default: 0
    },
    isWaiter: {
        type: Boolean,
        default: true,
    }
})

const WaiterModel = mongoose.model('Waiter', waiterSchema)

export default WaiterModel