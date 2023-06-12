import { validate } from "class-validator";
import { CreateHouseDTO, UpdateHouseDto } from "./house.dto";

describe("CreateHouseDTO Validation", () => {
  it("should validate a valid CreateHouseDTO object", async () => {
    const dto = new CreateHouseDTO();
    dto.address = "Valid Address";
    dto.currentValue = 1000;
    dto.loanAmount = 500;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should return validation errors for an invalid CreateHouseDTO object", async () => {
    const dto = new CreateHouseDTO();
    dto.address = "q";
    dto.currentValue = -100;
    dto.loanAmount = -1;

    const errors1 = await validate(dto);
    expect(errors1.length).toBeGreaterThan(0);
    expect(errors1[0].constraints).toHaveProperty("minLength");

    dto.address = "Vaaaaalid"; // normal address

    const errors2 = await validate(dto);
    expect(errors2.length).toBeGreaterThan(0);
    expect(errors2[0].constraints).toHaveProperty("min");

    dto.currentValue = 100;
    const errors3 = await validate(dto);
    expect(errors3.length).toBeGreaterThan(0);
    expect(errors3[0].constraints).toHaveProperty("min");
  });
});

describe("UpdateHouseDto Validation", () => {
  it("should validate a valid UpdateHouseDto object", async () => {
    const dto = new UpdateHouseDto();
    dto.address = "Valid Address";
    dto.currentValue = 1000;
    dto.loanAmount = 500;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should return validation errors for an invalid UpdateHouseDto object", async () => {
    const dto = new UpdateHouseDto();
    dto.address = "q"; // Address is too short
    dto.currentValue = -100; // Negative value not allowed
    dto.loanAmount = -1; // Zero value not allowed

    const errors1 = await validate(dto);
    expect(errors1.length).toBeGreaterThan(0);
    expect(errors1[0].constraints).toHaveProperty("minLength");

    dto.address = "Vaaaaalid"; // normal address

    const errors2 = await validate(dto);
    expect(errors2.length).toBeGreaterThan(0);
    expect(errors2[0].constraints).toHaveProperty("min");

    dto.currentValue = 100;
    const errors3 = await validate(dto);
    expect(errors3.length).toBeGreaterThan(0);
    expect(errors3[0].constraints).toHaveProperty("min");
  });
});
