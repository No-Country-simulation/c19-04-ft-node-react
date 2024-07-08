import WaiterModel from '../models/waiter.model.js'
import TableModel from '../models/waiter.model.js'
import logger from '../utils/logger.js'


export const sendMessage = async (req, res) => {
    const tableNumber = req.params.tableNumber

    if (!tableNumber) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
        const waiter = await WaiterModel.findOne({ tablesAssigned: Number.parseInt(tableNumber) })

        logger.info('The waiter has been requested')
        res.status(201).json({ tableNumber, message: `The table number ${tableNumber} request assistance`, waiterUser: waiter.username })
    } catch (err) {
        logger.error(
            `Error requesting waiter: ${err}, Request Data: ${JSON.stringify(data)}`,
        )
        res.status(500).json({ error: 'Error requesting waiter' })
    }
}

export const assignTables = async (req, res) => {
    try {
        const dataWaiter = req.params.userMozo
        const mozo = await WaiterModel.findOne({ username: dataWaiter })

        req.body.tables.map((mesa) => {
            const isAlreadyAssigned = mozo.tablesAssigned.indexOf(mesa)
            if (isAlreadyAssigned !== -1) {
                return res.status(403).json({ mesagge: 'Table is already assigned to this waiter' })
            }
            mozo.tablesAssigned.push(mesa)
        })

        await WaiterModel.findByIdAndUpdate({ _id: mozo._id }, mozo, { new: true })

        logger.info('Waiter updated correctly')
        res.status(200).json({ message: 'Tables assigned correctly' })
    } catch (error) {
        logger.error(`Something unexpected happend at ${err}`)
        res.status(500).json({ message: 'Server Internal Error' })

    }

}