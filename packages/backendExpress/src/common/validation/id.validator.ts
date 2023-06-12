import {plainToClass} from "class-transformer";
import {IdDTO} from "./dto/id.dto";
import {validate} from "class-validator";
import {ErrorException} from "../errors/error-exception";
import {ErrorCode} from "../errors/error-code";
import {NextFunction, Request, Response} from "express";

export const idValidator = async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.params', req.params)    ;
    const params = plainToClass(IdDTO, {id: Number(req.params.id)});
    const errorsParams = await validate(params);
    if (errorsParams.length) {
        return next(new ErrorException(ErrorCode.ValidationError, errorsParams));
    }

    next();
}