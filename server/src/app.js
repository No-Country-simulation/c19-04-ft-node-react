import express from 'express'
import dbConnection from './connections/mongoose.js'
import cors from 'cors'
import logger from './utils/logger.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.json('C19-04-backend')
})

app.get('/health', (req, res) => {
	logger.http('Health OK.')
	res.json('Health OK')
})

dbConnection()

app.listen(process.env.PORT, () => {
	console.info(`Server is running on http://localhost:${process.env.PORT}`)
})
