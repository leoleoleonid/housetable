import {HouseRepository} from "./house.repository";
import HouseModel, {HouseInput} from "./house.model";

export default class HouseController {
    private houseRepository: HouseRepository;

    constructor(houseRepository: HouseRepository) {
        this.houseRepository = houseRepository;
    }

    static createInstance(): HouseController {
        const houseRepository = HouseRepository.createInst();
        return new HouseController(houseRepository)
    }

    async getAll() : Promise<HouseModel[]>{
        return this.houseRepository.getAll()
    }

    async getById(id: number): Promise<HouseModel | null> {
        return this.houseRepository.getById(id);
    }

    async updateOne(id: number, house: Partial<HouseInput>) : Promise<void> {
        await this.houseRepository.updateHouse(id, house)
    }

    async create(house: HouseInput): Promise<HouseModel> {
        return await this.houseRepository.addHouse(house);
    }

}


export const controllerInstance: HouseController = HouseController.createInstance();