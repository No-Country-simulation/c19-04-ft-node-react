import qr from 'qrcode'
import logger from '../utils/logger.js'

class QRController {
	async generateQR(tableId) {
		try {
			const qrCode = await qr.toBuffer(tableId.toString())

			logger.info('QR created successfully')
			return qrCode
		} catch (err) {
			logger.error(`Error in QRController.generateQR: ${err}`)
			throw new Error('Internal Server Error')
		}
	}
}

export default new QRController()
