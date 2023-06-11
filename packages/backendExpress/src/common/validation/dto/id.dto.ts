import {IsNumber, Min} from "class-validator";

export class IdDTO {
    @IsNumber()
    @Min(0)
    id: number;
}