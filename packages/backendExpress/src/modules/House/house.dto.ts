import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsOptional,
  Min,
  IsEmpty,
} from "class-validator";
import { House } from "./house.model";

export class CreateHouseDTO implements Omit<House, "id" | "risk"> {
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  address: string;

  @IsNumber()
  @Min(0)
  currentValue: number;

  @IsNumber()
  @Min(0)
  loanAmount: number;
}

export class UpdateHouseDto extends CreateHouseDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  address: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  currentValue: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  loanAmount: number;
}
