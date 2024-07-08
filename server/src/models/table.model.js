import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
	QRCode: Buffer,
	tableNumber: Number,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CardMenu',
		},
	],
	role: {
		type: String,
		default: "table"
	}
})

const TableModel = mongoose.model('Table', tableSchema)

export default TableModel
