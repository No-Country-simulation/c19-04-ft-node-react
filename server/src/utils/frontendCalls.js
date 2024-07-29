// import database from "../connections/firebase.js";
// import { ref, get, set } from "firebase/database";
// import OrderController from "../controllers/order.controller.js";
// import logger from "./logger.js";

// export const setReady = async (tableNumber, index, order) => {
//   try {
//     const dinerRef = ref(
//       database,
//       `/tables/table_${tableNumber}/diners/${index}`
//     );
//     const dinerSnapshot = await get(dinerRef);
//     const dinerData = dinerSnapshot.val();
//     if (!dinerData) {
//       return { status: 404, responseType: "error", message: "Diner not found" };
//     }
//     await set(dinerRef, {
//       ...dinerData,
//       ready: true,
//       order,
//     });
//     await OrderController.createOrder(tableNumber, order);
//     return {
//       status: 200,
//       responseType: "info",
//       message: `Diner ${dinerData.name} is ready.`,
//     };
//   } catch (error) {
//     throw new Error(`Error in FrontendController.setReady: ${error.message}`);
//   }
// };

// export const createIndividualOrder = async (
//   table_number,
//   dinerIndex,
//   order
// ) => {
//   try {
//     const dinerRef = ref(
//       database,
//       `/tables/${table_number}/diners/${dinerIndex}`
//     );
//     const dinerSnapshot = await get(dinerRef);
//     const dinerData = dinerSnapshot.val();
//     if (!dinerData) {
//       return { status: 404, responseType: "error", message: "Diner not found" };
//     }
//     await set(dinerRef, {
//       ...dinerData,
//       order: [...(dinerData.order || []), ...order],
//     });
//     await OrderController.createOrder(table_number, order);
//     return {
//       status: 201,
//       responseType: "info",
//       message: "Order created successfully.",
//     };
//   } catch (error) {
//     throw new Error(
//       `Error in FrontendController.createIndividualOrder: ${error.message}`
//     );
//   }
// };

// // export const test = (name, lastName) => {
// //   try {
// //     if (!name.includes("u")) {
// //       return {
// //         status: 400,
// //         responseType: "error",
// //         message: "The word does not contain any U.",
// //       };
// //     }
// //     const upperName = name.toUpperCase();
// //     const upperLastName = lastName.toUpperCase();
// //     return {
// //       status: 200,
// //       responseType: "info",
// //       result: { upperName, upperLastName },
// //       message: "Words uppered successfully.",
// //     };
// //   } catch (error) {
// //     throw new Error(`Error in FrontendController.test: ${error.message}`);
// //   }
// // };
