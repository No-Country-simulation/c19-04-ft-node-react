import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.MONGO_NAME,
		})
		logger.info('Server connected to MongoDB')
	} catch (err) {
		logger.fatal(`Error connecting to MongoDB: ${err}`)
	}
}

export default dbConnection
