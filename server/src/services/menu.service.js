import MenuModel from "../models/menu.model.js";
import logger from "../utils/logger.js";

export const getMenu = async (req, res) => {
    try {
        const menu = await MenuModel.find();

        res.status(200).json(menu);
    } catch (error) {
        logger.error(`Error in menu.service.getMenu: ${error}`);
    }
};

export const getDishesByIds = async (ids) => {
    try {
        console.log(ids);

        const promises = ids.map((id) => MenuModel.findOne({ _id: id }));

        // Ejecutar todas las promesas en paralelo y obtener los resultados
        const results = await Promise.allSettled(promises);

        // Filtrar los resultados exitosos y extraer los documentos
        const dishes = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);

        console.log(dishes);
        return dishes;
    } catch (error) {
        logger.error(`Error in menu.service.getDishById: ${error}`);
    }
};
