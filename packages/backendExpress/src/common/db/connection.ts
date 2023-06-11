import {config} from "../config";
import {Sequelize} from "sequelize";
import {HouseModel} from "./models";
import {Dialect} from "sequelize/types/sequelize";

const dbConfig = {...config.db};

const sequelizeConnection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect as Dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    // models: [HouseModel]
})


export default sequelizeConnection

