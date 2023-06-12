import HouseController from "./house.controller";
import { HouseRepository } from "./house.repository";
import HouseModel, { HouseInput } from "./house.model";

describe("HouseController", () => {
  let houseRepositoryMock: jest.Mocked<HouseRepository>;
  let houseController: HouseController;

  beforeEach(() => {
    houseRepositoryMock = {
      getAll: jest.fn(),
      getById: jest.fn(),
      updateHouse: jest.fn(),
      addHouse: jest.fn(),
    } as unknown as jest.Mocked<HouseRepository>;

    houseController = new HouseController(houseRepositoryMock);
  });

  describe("getAll", () => {
    it("should return all houses from the repository", async () => {
      const houses: HouseModel[] = [
        {
          id: 1,
          address: "qwerqwerqwer",
          currentValue: 200000,
          loanAmount: 150000,
          risk: 0.75,
        },
        {
          id: 2,
          address: "ascasdcasdc",
          currentValue: 300000,
          loanAmount: 200000,
          risk: 0.67,
        },
      ] as HouseModel[];
      houseRepositoryMock.getAll.mockResolvedValue(houses);

      const result = await houseController.getAll();

      expect(houseRepositoryMock.getAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(houses);
    });
  });

  describe("getById", () => {
    it("should return the house with the specified ID from the repository", async () => {
      const houseId = 1;
      const house: HouseModel | null = {
        id: houseId,
        address: "qewrqwerqwe",
        currentValue: 200000,
        loanAmount: 150000,
        risk: 0.75,
      } as HouseModel;
      houseRepositoryMock.getById.mockResolvedValue(house);

      const result = await houseController.getById(houseId);

      expect(houseRepositoryMock.getById).toHaveBeenCalledTimes(1);
      expect(houseRepositoryMock.getById).toHaveBeenCalledWith(houseId);
      expect(result).toEqual(house);
    });
  });

  describe("updateOne", () => {
    it("should update the house with the specified ID in the repository", async () => {
      const houseId = 1;
      const updateData: Partial<HouseInput> = {
        address: "gfvdfvdfvdfv",
        currentValue: 300000,
        loanAmount: 200000,
      };

      await houseController.updateOne(houseId, updateData);

      expect(houseRepositoryMock.updateHouse).toHaveBeenCalledTimes(1);
      expect(houseRepositoryMock.updateHouse).toHaveBeenCalledWith(
        houseId,
        updateData
      );
    });
  });

  describe("create", () => {
    it("should add a new house to the repository", async () => {
      const newHouse: HouseInput = {
        address: "dfvgbfgbfgblkgf",
        currentValue: 250000,
        loanAmount: 180000,
      };
      const createdHouse: HouseModel = {
        id: 3,
        address: "cccccccccccccccccccd",
        currentValue: 250000,
        loanAmount: 180000,
        risk: 0.72,
      } as HouseModel;
      houseRepositoryMock.addHouse.mockResolvedValue(createdHouse);

      const result = await houseController.create(newHouse);

      expect(houseRepositoryMock.addHouse).toHaveBeenCalledTimes(1);
      expect(houseRepositoryMock.addHouse).toHaveBeenCalledWith(newHouse);
      expect(result).toEqual(createdHouse);
    });
  });
});
