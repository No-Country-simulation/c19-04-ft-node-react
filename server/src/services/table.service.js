import TableModel from "../models/table.model.js";
import { generateQR } from "./qr.service.js";
import logger from "../utils/logger.js";
import database from "../connections/firebase.js";
import { ref, onValue, get, set } from "firebase/database";
export const createTable = async (req, res) => {
  const data = req.body;

  if (!data.link) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newQR = await generateQR(data.link.toString());
    const table = {
      QRCode: newQR,
      tableNumber: data.tableNumber,
      link: data.link,
    };
    const tablesRef = ref(database, "/tables");
    const tablesSnapshot = await get(tablesRef);
    const tablesData = tablesSnapshot.val();
    const tableKey = `table_${data.tableNumber}`;
    await set(tablesRef, {
      ...tablesData,
      [tableKey]: {},
    });
    await TableModel.create(table);

    res.status(201).json({ message: "Table created successfully" });
    logger.info("Table created successfully");
  } catch (err) {
    logger.error(
      `Error creating table: ${err}, Request Data: ${JSON.stringify(data)}`
    );
    res.status(500).json({ error: "Error creating table" });
  }
};

export const getTable = async (req, res) => {
  const tableNumber = req.params.tableNumber;

  try {
    const table = await TableModel.findOne({ tableNumber });

    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.type("image/png");
    res.status(200).json({ QRCode: table.QRCode });
  } catch (err) {
    logger.error(`Error getting table: ${err}`);
    res.status(500).json({ error: "Error getting table" });
  }
};
