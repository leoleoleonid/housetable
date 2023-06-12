import { House } from "./house.model";

describe("House", () => {
  describe("calcRisk", () => {
    it("should calculate the risk as the ratio of loanAmount to currentValue", () => {
      const house = new House();
      house.currentValue = 100;
      house.loanAmount = 50;
      House.calcRisk(house);
      expect(house.risk).toBe(0.5);
    });

    it("should set the risk to 1 if the ratio of loanAmount to currentValue is greater than 1", () => {
      const house = new House();
      house.currentValue = 100;
      house.loanAmount = 200;
      House.calcRisk(house);
      expect(house.risk).toBe(1);
    });

    it("should increase the risk by an additional 10% if the loanAmount is more than 50% of currentValue", () => {
      const house = new House();
      house.currentValue = 100;
      house.loanAmount = 60;
      House.calcRisk(house);
      expect(house.risk).toBe(0.7);
    });

    it("should not modify the risk if the loanAmount is 50% or less of currentValue", () => {
      const house = new House();
      house.currentValue = 100;
      house.loanAmount = 50;
      House.calcRisk(house);
      expect(house.risk).toBe(0.5);

      house.currentValue = 100;
      house.loanAmount = 40;
      House.calcRisk(house);
      expect(house.risk).toBe(0.4);
    });
  });
});
