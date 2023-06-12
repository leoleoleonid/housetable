import { config } from "../config";
import { Sequelize } from "sequelize";
import { Dialect } from "sequelize/types/sequelize";
import HouseModel, { initModel } from "../../modules/House/house.model";

const dbConfig = { ...config.db };

const sequelizeConnection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect as Dialect,
    host: dbConfig.host,
    port: dbConfig.port,
  }
);

export default sequelizeConnection;

export const dbInit = async () => {
  initModel(sequelizeConnection);
  await HouseModel.sync({ alter: dbConfig.synchronize });
};
