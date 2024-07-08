import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
	QRCode: Buffer,
	tableNumber: Number,
	link: String,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CardMenu',
		},
	],
	role: "table"
})

const TableModel = mongoose.model('Table', tableSchema)

export default TableModel
