import HouseModel from '../../modules/House/house.model';
import {config} from "../config";

const dbConfig = {...config.db};

export const dbInit = async () => {
    await HouseModel.sync({alter: dbConfig.synchronize})
}
export {
    HouseModel
}