import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		orderNumber: {
			type: Number,
			required: true,
		},
		table: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Table',
		},
		status: {
			type: String,
			enum: ['pending', 'ready'],
			default: 'pending',
		},
		readyAt: {
			type: Date,
		},
		//   delay: { //Próximamente
		//     type: Date,
		//   }
	},
	{ timestamps: true },
)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
