import express from 'express'
import dbConnection from './connections/mongoose.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.json('C19-04-backend')
})

dbConnection()

app.listen(process.env.PORT, () => {
	console.info(`Server is running on http://localhost:${process.env.PORT}`)
})
