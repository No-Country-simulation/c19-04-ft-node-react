import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('No se centrar un div, soy backend')
})

app.listen(3000, () => {
	console.log('Server on port 3000')
})
