import database from "../connections/firebase.js";
import { ref } from "firebase/database";

const tablesRef = ref(database, "/tables");
const ordersRef = ref(database, "/orders");
const waitersRef = ref(database, "/waiters");

export { tablesRef, ordersRef, waitersRef };
