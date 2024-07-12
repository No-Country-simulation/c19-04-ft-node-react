import winston from 'winston'

const PERSISTANCE = process.env.PERSISTANCE

console.info(`Environment: ${PERSISTANCE}`) // Agregar para verificar el valor de PERSISTANCE

const custom = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		http: 4,
		debug: 5,
	},

	colors: {
		debug: 'blue',
		http: 'green',
		info: 'white',
		warn: 'yellow',
		error: 'red',
		fatal: 'magenta',
	},
}

winston.addColors(custom.colors)

const createLogger = (env) => {
	if (env === 'PROD') {
		console.info('Configuring logger for PROD environment') // Agregar para confirmar la configuración de PROD
		return winston.createLogger({
			levels: custom.levels,
			transports: [
				new winston.transports.File({
					filename: './logs/errors.log',
					level: 'error',
					format: winston.format.simple(),
				}),
				new winston.transports.Console({
					level: 'info',
					format: winston.format.combine(
						winston.format.colorize(),
						winston.format.simple(),
					),
				}),
			],
		})
	}
	console.info('Configuring logger for non-PROD environment') // Agregar para confirmar la configuración de no PROD
	return winston.createLogger({
		levels: custom.levels,
		transports: [
			new winston.transports.Console({
				level: 'debug',
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.simple(),
				),
			}),
		],
	})
}

export default createLogger(PERSISTANCE)
