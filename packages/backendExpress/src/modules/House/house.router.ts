import express from "express";
import HouseController from "./house.controller";
import {plainToClass} from "class-transformer";
import {CreateHouseDTO, UpdateHouseDto} from "./house.dto";
import {validate} from "class-validator";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";
import {idValidator} from "../../common/validation/id.validator";

const router = express.Router();

router.get("/:id", idValidator, async (req, res, next) => {
  const id: number = Number(req.params.id);
  const controller = HouseController.createInstance();
  const response = await controller.getById(id);
  return res.send(response);
});

router.get("/", async (req, res, next) => {
  try {
    const controller = HouseController.createInstance();
    const response = await controller.getAll();
    return res.send(response);
  } catch (error) {
    return next(error);
  }
});
router.post("/", async (req, res, next) => {
  const createHouseDTO = plainToClass(CreateHouseDTO, req.body);
  console.log('createHouseDTO', createHouseDTO)
  const errors = await validate(createHouseDTO);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.ValidationError, errors));
  }
  try {
    const controller = HouseController.createInstance();
    const response = await controller.create(createHouseDTO);
    return res.send(response);
  } catch (error) {
    return next(error);
  }
});
router.put("/:id", idValidator, async (req, res, next) => {
  const id = Number(req.params.id);
  const updateHouseDto = plainToClass(UpdateHouseDto, req.body);
  const errorsBody = await validate(updateHouseDto);
  if (errorsBody.length) {
    return next(new ErrorException(ErrorCode.ValidationError, errorsBody));
  }
  try {
    const controller = HouseController.createInstance();
    await controller.updateOne(id, updateHouseDto);
    return res.send({msg: 'success'});
  } catch (error) {
    return next(error);
  }
});


export default router