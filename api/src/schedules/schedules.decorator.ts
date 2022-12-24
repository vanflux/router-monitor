import { applyDecorators } from "@nestjs/common";
import { Validate } from "class-validator";
import { CronValidator } from "./schedules.validator";

export const ValidateCron = () => applyDecorators(Validate(CronValidator));
