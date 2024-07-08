import mongoose from 'mongoose'

const cardMenuSchema = new mongoose.Schema({
	alcohol: [],
	extras: [],
	drinks: [],
	dessert: [],
	starters: [],
	menus: []
})

const CardMenu = mongoose.model('CardMenu', cardMenuSchema)

export default CardMenu
