import MongoDB from './mongoose.js'
import firebaseDB from './firebase.js'
import logger from '../utils/logger.js'
import { verifyAdmin } from '../utils/verifyAdmin.js'

export const ServerUp = async (app) => {
	try {
		MongoDB()
		if (firebaseDB) {
			logger.info('Sever connected to Firebase')
		}
		app.listen(process.env.PORT, () => {
			logger.info(`Server running on port ${process.env.PORT}`)
		})
		verifyAdmin()
	} catch (err) {
		logger.fatal(`Error starting server: ${err}`)
	}
}
