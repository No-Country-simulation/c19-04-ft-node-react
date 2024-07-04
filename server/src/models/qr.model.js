import mongoose from 'mongoose'

const qrSchema = new mongoose.Schema({
	qrCode: Buffer,
})

const QRModel = mongoose.model('QR', qrSchema)

export default QRModel
