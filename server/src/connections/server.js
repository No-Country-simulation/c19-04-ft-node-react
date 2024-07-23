import dbConnection from './mongoose.js'
import logger from '../utils/logger.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

export const ServerUp = async (app) => {
	try {
		dbConnection()
		app.listen(process.env.PORT, () => {
			logger.info(`Server running on port ${process.env.PORT}`)
		})
		verifyAdmin()
	} catch (err) {
		logger.fatal(`Error starting server: ${err}`)
	}
}
