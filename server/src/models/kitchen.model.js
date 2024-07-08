import mongoose from 'mongoose'

const kitchenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    branch: {
        type: Number,
        default: 0,
    },
    role: "kitchen"
})

const KitchenModel = mongoose.model('Kitchen', kitchenSchema)

export default KitchenModel