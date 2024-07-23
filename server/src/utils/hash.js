import bcrypt from 'bcrypt'

const create = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

const compare = async (password, hash) => {
	return bcrypt.compare(password, hash)
}

const Hash = {
	create,
	compare,
}

export default Hash
