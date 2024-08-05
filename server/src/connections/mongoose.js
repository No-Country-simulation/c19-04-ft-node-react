import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const MongoDB = async () => {
	if (process.env.PERSISTANCE === 'PROD') {
		try {
			await mongoose.connect(process.env.ATLAS_URI, {
				dbName: process.env.ATLAS_NAME,
			})
			logger.info('Server connected to Cluster')

			return
		} catch (err) {
			logger.fatal(`Error connecting to Cluster: ${err}`)
		}
	}

	try {
		await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.MONGO_NAME,
		})
		logger.info('Server connected to MongoDB')
	} catch (err) {
		logger.fatal(`Error connecting to MongoDB: ${err}`)
	}
}

export default MongoDB
