//TODO: Conexion a la DB
import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error(error)
    }
}

export default dbConnection