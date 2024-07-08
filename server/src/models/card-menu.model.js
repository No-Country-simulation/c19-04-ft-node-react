//modelo de carta del restaurante

// Bebidas Alcoholicas []
// Guarniciones []
// Bebidas sin Alcohol []
// Entradas
// Postres
// Menus -> Menu[]

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
