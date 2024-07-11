import { fileURLToPath } from 'url'
import OrderModel from '../models/orders.model.js'
import logger from '../utils/logger.js'
import fs from 'fs'
import path from 'path'
export const getAllOrders = async (req, res) => {
	try {
		const allOrders = await OrderModel.find()
		logger.info(`All orders: ${allOrders}`)
		return res.status(200).json(allOrders)
	} catch (error) {
		logger.error(`Error in order.service.getAllOrders: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}

export const createOrder = async (req, res) => {
	try {
		const { table } = req.body
		if (!table) {
			logger.error('Missing required fields')
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const fileName = fileURLToPath(import.meta.url)
		console.log(fileName)
		const dirname = path.dirname(fileName)
		console.log(dirname)
		const orderCountFile = path.resolve(
			`${dirname}../../../data/orderCount.json`,
		)
		console.log(orderCountFile)
		const orderCountJSON = fs.readFileSync(
			orderCountFile,
			'utf-8',
			(err, data) => {
				if (err) {
					console.error(err)
					return
				}
				console.log(data)
			},
		)
		console.log({ orderCountJSON })
		const { orderCount } = JSON.parse(orderCountJSON)
		console.log({ orderCount })
		const order = await OrderModel.create({
			orderNumber: orderCount + 1,
			table: table._id,
			readyAt: null,
		})
		fs.writeFile(
			orderCountFile,
			JSON.stringify({ orderCount: orderCount + 1 }),
			(err) => {
				if (err) throw err
			},
		)
		logger.info(`Order ${order} created successfully.`)
		return res.status(201).json(order)
	} catch (error) {
		logger.error(`Error in order.service.createOrder: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}

export const getPendingOrders = async (req, res) => {
	try {
		const pendingOrders = await OrderModel.find()
			.where('status')
			.equals('pending')
			.exec()
		logger.info(`All pending orders: ${pendingOrders}`)
		return res.status(200).json(pendingOrders)
	} catch (error) {
		logger.error(`Error in order.service.allPendingOrders: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}

export const updateStatus = async (req, res) => {
	try {
		const { orderId } = req.params
		if (!orderId) {
			logger.error(`Missing required orderId.`)
			return res.status(400).send('Missing required orderId.')
		}
		const orderToUpdate = await OrderModel.findByIdAndUpdate(
			orderId,
			{
				status: 'ready',
				readyAt: new Date(),
			},
			{ new: true },
		)
		if (!orderToUpdate) {
			logger.error(`Order ${orderId} not found.`)
			return res.status(404).send('Order not found.')
		}
		logger.info(`Order ${orderToUpdate} updated successfully.`)
		return res.status(200).json(orderToUpdate)
	} catch (error) {
		logger.error(`Error in order.service.updateStatus: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}

export const getReadyOrders = async (req, res) => {
	try {
		const readyOrders = await OrderModel.find()
			.where('status')
			.equals('ready')
			.exec()
		logger.info(`All ready orders: ${readyOrders}`)
		return res.status(200).json(readyOrders)
	} catch (error) {
		logger.error(`Error in order.service.getReadyOrders: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}

export const deleteOrder = async (req, res) => {
	try {
		const { orderId } = req.params
		if (!orderId) {
			logger.error(`Missing required orderId.`)
			return res.status(400).send('Missing required orderId.')
		}
		const orderToDelete = await OrderModel.findByIdAndDelete(orderId)
		if (!orderToDelete) {
			logger.error(`Order ${orderId} not found.`)
			return res.status(404).send('Order not found.')
		}
		logger.info(`Order ${orderToDelete} deleted successfully.`)
		return res.status(200).json({
			message: `Order ${orderId} deleted successfully.`,
			orderDeleted: orderToDelete,
		})
	} catch (error) {
		logger.error(`Error in order.service.getReadyOrders: ${error}`)
		res.status(500).send('Internal Server Error')
	}
}
