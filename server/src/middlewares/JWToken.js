import jwt from 'jsonwebtoken'

const validarJWT = (req, res, next) => {
	const token = req.header('TokenJWT')

	if (!token) {
		logger.error('Invalid token')
		return res.status(403).json({
			msg: 'El usuario no se encuentra autorizado a acceder al recurso',
			type: 'error',
		})
	}

	try {
		const body = jwt.verify(token, process.env.SECRET_KEY)
		logger.info(`Token Successfully Created: ${body}`)
	} catch (error) {
		logger.error(`Token expired: ${error}`)
		return res.status(401).json({ msg: 'La sesión expiró', type: 'error' })
	}
	next()
}

module.exports = validarJWT
