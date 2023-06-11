import HouseModel, {HouseInput} from "./house.model";

export class HouseRepository {
    private houseModel: typeof HouseModel;
    constructor(houseModel: typeof HouseModel) {
        this.houseModel = houseModel
    }

    static createInst () {
        return new HouseRepository(HouseModel);
    }

    async getAll(): Promise<HouseModel[]> {
        return await this.houseModel.findAll();
    }

    async getById(id: number): Promise<HouseModel | null> {
        return await this.houseModel.findByPk(id);
    }
    async addHouse(house: HouseInput) {
        await this.houseModel.build(house).save()
    }

    async updateHouse(id: number, house: Partial<HouseInput>) {
        const foundHouse: HouseModel | null = await this.getById(id);
        if (!foundHouse) throw 'No house with this id';
        await foundHouse.update(house);
    }
}