import AdminModel from '../models/admin.model.js'
import Hash from './hash.js'
import logger from './logger.js'

export const verifyAdmin = async () => {
	try {
		const adminExists = await AdminModel.findOne({ role: 'admin' })

		if (!adminExists) {
			const hashedPassword = await Hash.create(process.env.ADMIN_PASSWORD)
			const admin = new AdminModel({
				username: 'admin',
				password: hashedPassword,
			})
			await admin.save()
			logger.info(
				`Admin created: username: ${admin.username}, password: ${process.env.ADMIN_PASSWORD}`,
			)
		}
	} catch (err) {
		logger.error(`Error in verifyAdmin: ${err}`)
	}
}
