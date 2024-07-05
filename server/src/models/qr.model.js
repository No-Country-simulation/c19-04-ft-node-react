import mongoose from 'mongoose'

const qrSchema = new mongoose.Schema({
	qrCode: {
		type: Buffer,
		required: true
	}
})

const QRModel = mongoose.model('QR', qrSchema)

export default QRModel
