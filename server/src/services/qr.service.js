import qr from 'qrcode'
import logger from '../utils/logger.js'

export const generateQR = async (tableId) => {
	try {
		const qrCode = await qr.toBuffer(tableId.toString())
		logger.info('QR created successfully')
		return qrCode
	} catch (err) {
		logger.error(`Error generating QR: ${err}`)
		throw err
	}
}
