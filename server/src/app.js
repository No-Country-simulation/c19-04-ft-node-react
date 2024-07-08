import express from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import { ServerUp } from './connections/server.js'
import TableRoutes from './routes/table.routes.js'
import AuthRoutes from './routes/auth.routes.js'
import AdminRoutes from './routes/administrator.routes.js'
import WaiterRoutes from './routes/waiter.routes.js'
import CardMenuRoutes from './routes/card-menu.routes.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.json('C19-04-backend')
})

app.get('/health', (req, res) => {
	logger.http('Health OK.')
	res.json('Health OK')
})

app.use('/api', TableRoutes)
app.use('/api', AuthRoutes)
app.use('/api', AdminRoutes)
app.use('/api', WaiterRoutes)
app.use('/api', CardMenuRoutes)

ServerUp(app)
