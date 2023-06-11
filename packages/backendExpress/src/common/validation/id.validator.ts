import {plainToClass} from "class-transformer";
import {IdDTO} from "./dto/id.dto";
import {validate} from "class-validator";
import {ErrorException} from "../errors/error-exception";
import {ErrorCode} from "../errors/error-code";
import {NextFunction, Request, Response} from "express";

export const idValidator = async (req: Request, res: Response, next: NextFunction) => {
    const query = plainToClass(IdDTO, req.query);
    const errorsQuery = await validate(query);
    if (errorsQuery.length) {
        return next(new ErrorException(ErrorCode.ValidationError, errorsQuery));
    }
}