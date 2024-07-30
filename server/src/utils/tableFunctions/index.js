import { ref, get, set } from 'firebase/database'
import database from '../../connections/firebase.js'
export const addUnassignedTable = async (tableNumber) => {
	const unassignedTablesRef = ref(database, '/tables/unassignedTables')
	const unassignedSnapshot = await get(unassignedTablesRef)
	const unassignedData = unassignedSnapshot.val() || []
	if (unassignedData.some((item) => item === tableNumber)) return
	await set(unassignedTablesRef, [...unassignedData, tableNumber])
}
export const removeUnassignedTable = async (tableNumber) => {
	const unassignedTablesRef = ref(database, '/tables/unassignedTables')
	const unassignedSnapshot = await get(unassignedTablesRef)
	const unassignedData = unassignedSnapshot.val() || []
	const newArray = unassignedData.filter((item) => item !== tableNumber)
	await set(unassignedTablesRef, newArray)
}
